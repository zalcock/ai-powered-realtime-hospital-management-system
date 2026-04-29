# Backend Dockerfile
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build (if needed - TypeScript is compiled at runtime with Bun)
# RUN bun build

# Production image
FROM oven/bun:1

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app . .

# Create non-root user (Alpine)
RUN addgroup -g 1001 nodejs 2>/dev/null || getent group nodejs > /dev/null || true
RUN adduser -u 1001 -G nodejs -D nodejs 2>/dev/null || getent passwd nodejs > /dev/null || true

# Set proper permissions
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun --eval "await (await import('http')).get('http://localhost:5000/').then(r => r.status === 200 ? process.exit(0) : process.exit(1))" || exit 1

# Start command
CMD ["bun", "run", "start:server"]
