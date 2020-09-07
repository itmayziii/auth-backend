const path = require('path')

// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
  apps: [{
    name: 'auth-backend',
    script: 'dist/server.js',
    instances: 1,
    autorestart: true,
    watch: process.env.NODE_ENV !== 'production' ? [path.resolve(__dirname, 'dist')] : false,
    max_memory_restart: '1G'
  }]
}
