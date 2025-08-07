# Student Dashboard Backend API

A fast and scalable REST API for the Student Learning Dashboard built with Node.js, Express, and TypeScript.

## ✨ Features

- 🔐 **JWT Authentication** - Secure login/register system
- 📚 **Course Management** - Browse, enroll, and track course progress
- 🏆 **Achievement System** - Gamified learning with badges and streaks
- 📊 **Analytics Dashboard** - Study time tracking and statistics
- 🎯 **User Profiles** - Personalized student profiles
- 🚀 **Fast Development** - Hot reload with nodemon
- 🛡️ **Security First** - Helmet, CORS, input validation
- 📱 **Mobile Ready** - RESTful API for any frontend

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd student-dashboard-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The server will start at `http://localhost:5000`

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm run start    # Start production server
npm test         # Run tests
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get specific course
- `GET /api/courses/enrolled/me` - Get user's enrolled courses
- `POST /api/courses/:id/enroll` - Enroll in course
- `DELETE /api/courses/:id/unenroll` - Unenroll from course

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/dashboard` - Get dashboard data
- `GET /api/user/achievements` - Get user achievements
- `GET /api/user/study-stats` - Get detailed study statistics

### Utility
- `GET /health` - Health check endpoint
- `GET /` - API information

## 🏗️ Architecture

```
src/
├── data/           # Mock data (replace with database)
├── middleware/     # Express middleware (auth, validation)
├── routes/         # API route handlers
├── types/          # TypeScript type definitions
├── utils/          # Utility functions (auth, response)
└── server.ts       # Main server file
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Example Login Request

```bash
curl -X POST http://localhost:5000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "sarah.johnson@email.com",
    "password": "password123"
  }'
```

## 📊 Response Format

All API responses follow this consistent format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🗃️ Database Migration

Currently using in-memory mock data. To integrate with a real database:

### PostgreSQL Example
```bash
npm install pg @types/pg
# Update data layer to use database queries
```

### MongoDB Example
```bash
npm install mongoose @types/mongoose
# Replace mock data with Mongoose models
```

## 🔧 Environment Variables

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
```

## 🚀 Deployment

### Docker (Recommended)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

### Heroku
```bash
# Add to package.json
"engines": {
  "node": "18.x"
}

# Deploy
git push heroku main
```

### Railway/Render
- Set `NODE_ENV=production`
- Build command: `npm run build`
- Start command: `npm start`

## 🧪 Testing

```bash
# Run tests
npm test

# Test specific endpoint
curl -X GET http://localhost:5000/health
```

## 📈 Performance

- **Compression** - Gzip compression enabled
- **Security** - Helmet.js security headers
- **CORS** - Configurable cross-origin requests
- **Rate Limiting** - Add express-rate-limit for production
- **Caching** - Add Redis for session/data caching

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ for fast educational platform development!