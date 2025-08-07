#!/bin/bash

# Student Dashboard Server Deployment Script for 91.99.193.156
# Usage: ./deploy-server.sh

set -e  # Exit on any error

SERVER_IP="91.99.193.156"
echo "🚀 Deploying Student Dashboard to server: $SERVER_IP"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Install dependencies
print_status "Installing dependencies..."
npm run install:all

# 2. Set up backend for server environment
print_status "Setting up backend environment..."
cd backend

# Copy server environment file
cp .env.server .env.production

# Seed the database for server
print_status "Setting up database..."
npm run seed

# Build the backend
print_status "Building backend..."
npm run build

print_status "✓ Backend ready"
cd ..

# 3. Set up frontend for server environment  
print_status "Setting up frontend environment..."
cd frontend

# Copy server environment file
cp .env.server .env.production

# Build the frontend
print_status "Building frontend..."
npm run build

print_status "✓ Frontend build complete"
cd ..

print_status "🎉 Deployment preparation complete!"

echo ""
echo "📋 Next Steps on Server ($SERVER_IP):"
echo ""
echo "1. Backend Deployment:"
echo "   cd backend"
echo "   npm install --omit=dev"
echo "   npm run start:prod"
echo ""
echo "2. Frontend Deployment:"
echo "   cd frontend"
echo "   npm install -g serve"
echo "   serve -s build -l 3000"
echo ""
echo "3. Or use PM2 for both:"
echo "   cd backend"
echo "   pm2 start ecosystem.config.js --env production"
echo "   cd ../frontend"
echo "   pm2 serve build 3000 --name 'student-dashboard-frontend'"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://$SERVER_IP:3000"
echo "   Backend:  http://$SERVER_IP:3001"
echo "   Health:   http://$SERVER_IP:3001/health"
echo ""
echo "🔐 Login Credentials:"
echo "   Email:    sarah.johnson@email.com"
echo "   Password: password123"
echo ""

print_status "Deployment script completed successfully! 🎯"