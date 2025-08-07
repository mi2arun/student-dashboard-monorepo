# Multi-stage build for production optimization
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and TypeScript
RUN npm cache clean --force
RUN npm ci --include=dev
RUN npm install -g typescript

# Copy source code
COPY . .

# Build the application using global TypeScript
RUN tsc --version
RUN tsc

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder stage  
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env.production ./.env.production 2>/dev/null || true

# Create logs directory
RUN mkdir logs && chown nodejs:nodejs logs

# Change ownership to nodejs user
COPY --chown=nodejs:nodejs . .
USER nodejs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "run", "start:prod"]