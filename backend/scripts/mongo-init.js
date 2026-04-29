// MongoDB initialization script for Docker containers
// This runs when the MongoDB container starts for the first time

db = db.getSiblingDB('hospital');

// Create admin user
db.createUser({
  user: 'admin',
  pwd: 'ChangeMe123!',
  roles: [
    {
      role: 'userAdminAnyDatabase',
      db: 'admin'
    },
    {
      role: 'readWriteAnyDatabase',
      db: 'admin'
    }
  ]
});

db.createCollection('users');

print('✅ MongoDB initialized with hospital database');
