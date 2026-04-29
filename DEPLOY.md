# Production Deployment Guide

## Quick Deploy with Docker (Recommended)

### Prerequisites
- Docker & Docker Compose installed
- Domain name with SSL certificate (optional but recommended)
- Server with at least 2GB RAM, 2 CPU cores

### 1. Prepare Server

```bash
# Clone repository
git clone <your-repo-url> /opt/medflow
cd /opt/medflow

# Create environment file
cp backend/.env.example backend/.env
nano backend/.env  # Edit values
```

### 2. Configure Environment Variables

**Required:**
```env
BETTER_AUTH_SECRET=$(openssl rand -hex 32)
BETTER_AUTH_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
MONGO_URI=mongodb://admin:strongpassword@mongodb:27017/hospital?authSource=admin
```

**Optional (uncomment and add values):**
```env
GEMINI_KEY=your-google-gemini-key
UPLOADTHING_TOKEN=your-uploadthing-token
POLAR_PRODUCT_ID=your-polar-product-id
POLAR_ACCESS_TOKEN=your-polar-access-token
POLAR_WEBHOOK_SECRET=your-polar-webhook-secret
```

**Secure BETTER_AUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Start Services

```bash
# Start all services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Check status
docker-compose ps
```

### 4. Seed Database

```bash
# Enter backend container
docker-compose exec backend bash

# Run seed script
bun run scripts/seed.ts

# Exit
exit
```

### 5. Configure Nginx Reverse Proxy (Optional but Recommended)

Create `nginx/nginx.conf`:

```nginx
upstream backend {
    server backend:5000;
}

upstream frontend {
    server frontend:5173;
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL Certificates (from Let's Encrypt or your CA)
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # Frontend (React SPA)
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' 'https://yourdomain.com' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
    }

    # WebSocket support for Socket.IO
    location /socket.io/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # UploadThing endpoints
    location /api/uploadthing {
        proxy_pass http://backend;
        client_max_body_size 50M;
    }

    # Security: Block access to sensitive files
    location ~ /\. {
        deny all;
    }
}
```

Update `docker-compose.yml` to include nginx service (uncomment it).

### 6. Enable HTTPS with Let's Encrypt

Using certbot:

```bash
# Install certbot
apt-get install certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d yourdomain.com

# Auto-renewal
certbot renew --dry-run
```

### 7. Configure MongoDB Persistence

The MongoDB data is stored in `mongodb_data` volume. To backup:

```bash
# Backup
docker-compose exec mongodb mongodump --out /backup
docker cp medflow-mongodb:/backup ./backup/

# Restore
docker cp ./backup medflow-mongodb:/backup
docker-compose exec mongodb mongorestore /backup
```

### 8. Set Up Monitoring

**Health Checks:**
- API: `https://yourdomain.com/api/me` (returns 200 if authenticated)
- Frontend: `https://yourdomain.com/` (should load dashboard)

**Application Logs:**
```bash
# View all logs
docker-compose logs -f

# Monitor specific service
docker-compose logs -f backend | bunyan

# JSON formatting with jq
docker-compose logs backend | jq '.msg'
```

**Resource Monitoring:**
```bash
# Container stats
docker stats

# MongoDB stats
docker-compose exec mongodb mongostat
```

### 9. Configure Email Service

Add to `backend/.env`:

```env
# Resend (recommended)
RESEND_API_KEY=re_xxx
EMAIL_FROM=MedFlow <noreply@yourdomain.com>

# Or SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

Then update email sending code in your controllers (or create new mailer service).

### 10. Set Up CI/CD (GitHub Actions Example)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /opt/medflow
            git pull origin main
            docker-compose down
            docker-compose build
            docker-compose up -d
            docker-compose exec backend bun run scripts/seed.ts
```

### 11. Security Hardening

1. **Change default ports:**
   - Update docker-compose to use non-standard ports (e.g., 5001, 5174)

2. **Enable firewall:**
```bash
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

3. **Disable MongoDB auth in docker-compose** (if enabled):
   - Set strong MONGO_INITDB_ROOT_PASSWORD

4. **Rotate secrets regularly:**
   - BETTER_AUTH_SECRET (every 6 months)
   - API keys (every 3 months)

5. **Enable rate limiting** (add to backend):
```typescript
import rateLimit from 'express-rate-limit';
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
}));
```

### 12. Backup Strategy

**Daily automated backups:**
```bash
# /opt/medflow/backup.sh
#!/bin/bash
BACKUP_DIR=/opt/medflow/backups
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec -T mongodb mongodump --gzip --archive=/backup/$DATE.gz
tar -czf $BACKUP_DIR/medflow_$DATE.tar.gz /opt/medflow/backups/*.gz
find $BACKUP_DIR -type f -mtime +7 -delete
```

Add to crontab:
```
0 2 * * * /opt/medflow/backup.sh
```

### 13. Troubleshooting

**Container won't start:**
```bash
docker-compose logs [service-name]
docker-compose ps
docker-compose down && docker-compose up -d
```

**Database connection refused:**
```bash
# Check MongoDB is running
docker-compose exec mongodb mongo --eval "db.adminCommand('ping')"

# Verify credentials in .env match docker-compose
```

**Frontend shows blank page:**
```bash
# Check backend CORS settings
docker-compose logs backend | grep CORS

# Verify frontend can reach API
docker-compose exec frontend curl http://backend:5000/api/me
```

**Socket.IO connection fails:**
- Ensure `FRONTEND_URL` matches the frontend URL
- Check that NGINX proxy supports WebSocket upgrades

### 14. Scaling

For multiple server instances:

1. **Load balancer:** Use NGINX or HAProxy with sticky sessions for Socket.IO
2. **Redis adapter:** Configure Socket.IO to use Redis pub/sub for multi-instance communication
3. **Database:** Migrate to MongoDB Atlas or a replica set
4. **CDN:** Serve frontend static assets via CloudFront/Cloudflare

### 15. Environment Checklist

- [ ] BETTER_AUTH_SECRET set to 32+ random chars
- [ ] MongoDB authentication enabled
- [ ] HTTPS/SSL configured
- [ ] Firewall rules in place
- [ ] Regular backups configured
- [ ] Monitoring alerts set up (UptimeRobot, Grafana, etc.)
- [ ] Email service configured
- [ ] Rate limiting enabled
- [ ] Log rotation configured (docker logs --tail)
- [ ] Secrets stored securely (use Docker secrets or vault)

---

**Need help?** Contact support@medflow.medical
