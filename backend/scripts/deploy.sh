#!/bin/bash

# Student Dashboard Production Deployment Script
# Usage: ./scripts/deploy.sh [environment]

set -e  # Exit on any error

ENVIRONMENT=${1:-production}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🚀 Starting deployment for environment: $ENVIRONMENT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root (not recommended)
if [ "$EUID" -eq 0 ]; then
    print_warning "Running as root. Consider using a non-root user for security."
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check required tools
print_status "Checking required tools..."
REQUIRED_TOOLS=("node" "npm" "git")
for tool in "${REQUIRED_TOOLS[@]}"; do
    if ! command_exists "$tool"; then
        print_error "$tool is required but not installed."
        exit 1
    fi
done

# Check for PM2 if not using Docker
if [ "$DEPLOYMENT_TYPE" != "docker" ] && ! command_exists "pm2"; then
    print_warning "PM2 not found. Installing globally..."
    npm install -g pm2
fi

print_status "✓ All required tools are available"

# Navigate to project directory
cd "$PROJECT_ROOT"

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
    print_status "Loading environment variables from .env.$ENVIRONMENT"
    export $(cat ".env.$ENVIRONMENT" | grep -v '^#' | xargs)
else
    print_warning ".env.$ENVIRONMENT not found. Using default values."
fi

# Git operations
print_status "Updating codebase from Git..."
if [ -d ".git" ]; then
    git fetch origin
    git checkout main
    git pull origin main
    print_status "✓ Code updated from Git"
else
    print_warning "Not a Git repository. Skipping Git operations."
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci --only=production
print_status "✓ Dependencies installed"

# Build application
print_status "Building application..."
npm run build:prod
print_status "✓ Application built successfully"

# Database operations
print_status "Setting up database..."
if [ ! -f "database.sqlite" ] || [ "$RESET_DB" = "true" ]; then
    print_status "Initializing database with seed data..."
    npm run seed:prod
    print_status "✓ Database initialized"
else
    print_status "✓ Database already exists"
fi

# Create logs directory
mkdir -p logs
print_status "✓ Logs directory created"

# Deployment method selection
DEPLOYMENT_TYPE=${DEPLOYMENT_TYPE:-pm2}

case $DEPLOYMENT_TYPE in
    "docker")
        print_status "Deploying with Docker Compose..."
        if command_exists "docker-compose"; then
            docker-compose -f docker-compose.yml down
            docker-compose -f docker-compose.yml build
            docker-compose -f docker-compose.yml up -d
            print_status "✓ Docker containers started"
        else
            print_error "docker-compose not found. Please install Docker and docker-compose."
            exit 1
        fi
        ;;
    "pm2")
        print_status "Deploying with PM2..."
        # Stop existing processes
        pm2 stop ecosystem.config.js --env $ENVIRONMENT || true
        
        # Start new processes
        pm2 start ecosystem.config.js --env $ENVIRONMENT
        
        # Save PM2 configuration
        pm2 save
        
        # Setup PM2 startup (if not already done)
        if ! pm2 startup | grep -q "already"; then
            print_status "Setting up PM2 startup script..."
            pm2 startup
        fi
        
        print_status "✓ Application started with PM2"
        ;;
    "systemd")
        print_status "Deploying with systemd..."
        # Copy systemd service file
        sudo cp scripts/student-dashboard.service /etc/systemd/system/
        sudo systemctl daemon-reload
        sudo systemctl enable student-dashboard
        sudo systemctl restart student-dashboard
        print_status "✓ Systemd service configured and started"
        ;;
    *)
        print_status "Starting application directly..."
        npm run start:prod &
        echo $! > app.pid
        print_status "✓ Application started (PID: $(cat app.pid))"
        ;;
esac

# Health check
print_status "Performing health check..."
sleep 5

HEALTH_URL="http://localhost:${PORT:-3001}/health"
if command_exists "curl"; then
    for i in {1..5}; do
        if curl -f "$HEALTH_URL" >/dev/null 2>&1; then
            print_status "✓ Health check passed"
            break
        elif [ $i -eq 5 ]; then
            print_error "Health check failed after 5 attempts"
            exit 1
        else
            print_status "Health check attempt $i failed, retrying in 3 seconds..."
            sleep 3
        fi
    done
else
    print_warning "curl not available, skipping health check"
fi

# Display deployment info
print_status "🎉 Deployment completed successfully!"
echo ""
echo "📊 Deployment Summary:"
echo "  Environment: $ENVIRONMENT"
echo "  Deployment Type: $DEPLOYMENT_TYPE"
echo "  API URL: http://localhost:${PORT:-3001}"
echo "  Health Check: $HEALTH_URL"
echo ""

if [ "$DEPLOYMENT_TYPE" = "pm2" ]; then
    echo "PM2 Management Commands:"
    echo "  View status: pm2 status"
    echo "  View logs: pm2 logs student-dashboard-api"
    echo "  Restart: pm2 restart student-dashboard-api"
    echo "  Stop: pm2 stop student-dashboard-api"
fi

echo ""
print_status "Deployment script completed!"