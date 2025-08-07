# Student Dashboard - Production Deployment Guide

This guide covers multiple deployment options for the Student Dashboard application in production environments.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git (for automated deployments)
- SSL certificates (for HTTPS)

### Environment Setup
1. Copy environment files:
   ```bash
   cp .env.production.example .env.production
   ```
2. Update environment variables with your production values
3. Configure your domain and SSL certificates

## 📦 Deployment Options

### Option 1: Docker Compose (Recommended)

**Best for:** Complete containerized deployment with both frontend and backend.

```bash
# Clone and setup
git clone <your-repo>
cd student-dashboard-backend

# Configure environment
cp .env.production.example .env.production
# Edit .env.production with your values

# Deploy with Docker
docker-compose up -d

# View logs
docker-compose logs -f
```

**Features:**
- ✅ Complete isolation
- ✅ Easy scaling
- ✅ Built-in health checks
- ✅ Automatic restarts
- ✅ Load balancing ready

### Option 2: PM2 Process Manager

**Best for:** Traditional VPS/server deployments with process management.

```bash
# Install PM2 globally
npm install -g pm2

# Run deployment script
./scripts/deploy.sh production

# Monitor application
pm2 status
pm2 logs student-dashboard-api
pm2 monit
```

**Features:**
- ✅ Process clustering
- ✅ Auto-restart on crashes
- ✅ Memory monitoring
- ✅ Load balancing
- ✅ Built-in logging

### Option 3: Systemd Service

**Best for:** Linux servers with systemd integration.

```bash
# Deploy with systemd
DEPLOYMENT_TYPE=systemd ./scripts/deploy.sh production

# Manage service
sudo systemctl status student-dashboard
sudo systemctl restart student-dashboard
sudo journalctl -u student-dashboard -f
```

### Option 4: Manual Deployment

**Best for:** Simple deployments or debugging.

```bash
# Build and start
npm run build:prod
npm run seed:prod
npm run start:prod
```

## 🌐 Server Setup

### Nginx Configuration

1. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Copy configuration:**
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/student-dashboard
   sudo ln -s /etc/nginx/sites-available/student-dashboard /etc/nginx/sites-enabled/
   ```

3. **Update domain and SSL paths:**
   ```bash
   sudo nano /etc/nginx/sites-available/student-dashboard
   # Update server_name and SSL certificate paths
   ```

4. **Test and reload:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### SSL Certificate Setup

#### Using Let's Encrypt (Recommended)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### Manual SSL Setup
```bash
# Update nginx.conf with your certificate paths:
ssl_certificate /path/to/your/certificate.crt;
ssl_certificate_key /path/to/your/private.key;
```

## 🖥️ Platform-Specific Deployments

### AWS EC2

1. **Launch EC2 Instance:**
   - Ubuntu 22.04 LTS
   - t3.small or larger
   - Security Group: Allow HTTP (80), HTTPS (443), SSH (22)

2. **Setup:**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx

   # Deploy application
   git clone <your-repo>
   cd student-dashboard-backend
   ./scripts/deploy.sh production
   ```

3. **Configure Security Group:**
   - Inbound: HTTP (80), HTTPS (443), SSH (22)
   - Outbound: All traffic

### DigitalOcean Droplet

1. **Create Droplet:**
   - Ubuntu 22.04
   - $12/month or higher
   - Add your SSH key

2. **One-click setup:**
   ```bash
   curl -fsSL https://raw.githubusercontent.com/your-repo/main/scripts/setup-digitalocean.sh | bash
   ```

### Heroku

1. **Prepare for Heroku:**
   ```bash
   # Add Procfile
   echo "web: npm run start:prod" > Procfile
   
   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret-key
   ```

2. **Deploy:**
   ```bash
   git push heroku main
   ```

### Railway

1. **Connect GitHub repository**
2. **Set environment variables in Railway dashboard**
3. **Deploy automatically on push**

## 📊 Monitoring & Maintenance

### Health Checks

**Manual Check:**
```bash
curl http://your-domain.com/health
```

**Automated Monitoring:**
```bash
# Add to crontab for health monitoring
*/5 * * * * curl -f http://localhost:3001/health || echo "API Down" | mail -s "Alert" admin@yourdomain.com
```

### Log Management

**PM2 Logs:**
```bash
pm2 logs student-dashboard-api
pm2 logs --lines 100
```

**Docker Logs:**
```bash
docker-compose logs -f --tail=100
```

**System Logs:**
```bash
sudo journalctl -u student-dashboard -f
```

### Database Backup

```bash
# Backup SQLite database
cp database.sqlite "database-backup-$(date +%Y%m%d-%H%M%S).sqlite"

# Automated backup (add to crontab)
0 2 * * * cp /path/to/database.sqlite /backups/database-$(date +\%Y\%m\%d).sqlite
```

## 🔒 Security Checklist

- [ ] Environment variables properly configured
- [ ] JWT secret is strong and unique
- [ ] Database is not publicly accessible
- [ ] SSL/TLS certificates are valid
- [ ] Rate limiting is enabled
- [ ] Security headers are configured
- [ ] Firewall rules are restrictive
- [ ] Server is regularly updated
- [ ] Backups are automated
- [ ] Monitoring is active

## 🚨 Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
sudo lsof -i :3001
sudo kill -9 PID
```

**Permission Denied:**
```bash
sudo chown -R $USER:$USER /path/to/app
```

**Database Locked:**
```bash
sudo pkill -f "node.*server.js"
rm database.sqlite-wal database.sqlite-shm
```

**SSL Certificate Issues:**
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Performance Tuning

**PM2 Optimization:**
```javascript
// ecosystem.config.js
{
  instances: 'max',
  exec_mode: 'cluster',
  max_memory_restart: '500M',
  node_args: '--max-old-space-size=512'
}
```

**Database Optimization:**
```bash
# Enable WAL mode for better performance
sqlite3 database.sqlite "PRAGMA journal_mode=WAL;"
```

## 📞 Support

- **Logs Location:** `/var/log/student-dashboard/`
- **Config Files:** `/etc/student-dashboard/`
- **Service Status:** `sudo systemctl status student-dashboard`
- **Health Check:** `http://your-domain.com/health`

For additional support, check the application logs and health endpoints first.

---

## 🔄 Deployment Automation

### GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        run: |
          ssh user@server 'cd /var/www/app && git pull && ./scripts/deploy.sh production'
```

### Continuous Deployment
Set up webhooks to automatically deploy on code changes while maintaining zero-downtime deployments.

This completes your production deployment setup! Choose the deployment method that best fits your infrastructure and requirements.