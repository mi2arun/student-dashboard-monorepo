module.exports = {
  apps: [
    {
      name: 'student-dashboard-api',
      script: './dist/server.js',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      
      // Auto-restart on crashes
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Memory monitoring
      max_memory_restart: '500M',
      
      // Health monitoring  
      health_check_grace_period: 30000,
      health_check_fatal_exceptions: true
    }
  ],

  deploy: {
    production: {
      user: 'node',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'git@github.com:username/student-dashboard-backend.git',
      path: '/var/www/student-dashboard-backend',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build:prod && npm run seed:prod && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};