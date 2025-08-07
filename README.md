# Student Dashboard - Full Stack Application

A comprehensive student learning dashboard built with React (frontend) and Node.js (backend) featuring course management, progress tracking, and achievement systems.

## 🏗️ Architecture

```
student-dashboard-monorepo/
├── frontend/          # React TypeScript frontend
├── backend/           # Node.js Express API
├── docker-compose.yml # Full-stack deployment
├── package.json       # Monorepo scripts
└── README.md         # This file
```

## ✨ Features

### Frontend (React + TypeScript)
- 📊 **Study Analytics Dashboard** - Time tracking, progress metrics
- 🏆 **Achievement System** - Apple Fitness-style streaks and badges  
- 📚 **Course Management** - My Courses and Course Catalog
- 🔐 **Authentication** - JWT-based login system
- 📱 **Responsive Design** - Tailwind CSS with mobile support

### Backend (Node.js + Express)
- 🔒 **JWT Authentication** - Secure user sessions
- 💾 **SQLite Database** - Zero-config embedded database
- 🛡️ **Security Middleware** - Rate limiting, CORS, Helmet
- 📊 **RESTful API** - Clean endpoint structure
- 🚀 **Production Ready** - PM2, Docker, monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Development Setup
```bash
# Clone and setup
git clone <repo-url>
cd student-dashboard-monorepo

# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev
```

**URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

### Login Credentials
```
Email: sarah.johnson@email.com
Password: password123
```

## 📦 Available Scripts

### Development
```bash
npm run dev              # Start both frontend and backend
npm run backend:dev      # Start backend only
npm run frontend:dev     # Start frontend only
```

### Production
```bash
npm run build           # Build both applications
npm run start           # Start production server
npm run deploy          # Run production deployment
```

### Docker
```bash
npm run docker:build    # Build Docker containers
npm run docker:up       # Start with Docker Compose
npm run docker:down     # Stop containers
npm run docker:logs     # View logs
```

### Utilities
```bash
npm run install:all     # Install all dependencies
npm run clean          # Remove node_modules
npm run backend:seed   # Seed database with test data
npm run test          # Run all tests
npm run lint          # Run linters
```

## 🚀 Production Deployment

### Option 1: Docker (Recommended)
```bash
docker-compose up -d
```

### Option 2: PM2 Process Manager
```bash
cd backend
./scripts/deploy.sh production
```

### Option 3: Manual Deploy
```bash
npm run build
npm run start
```

See `backend/DEPLOYMENT.md` for detailed deployment options.

## 🗂️ Project Structure

### Frontend (`/frontend`)
```
src/
├── components/        # React components
│   ├── Dashboard.tsx
│   ├── MyCourses.tsx
│   ├── AllCourses.tsx
│   └── AchievementsCard.tsx
├── contexts/         # React contexts
├── services/         # API service layer
└── types/           # TypeScript types
```

### Backend (`/backend`)
```
src/
├── routes/          # Express routes
├── database/        # Database models & seeders
├── middleware/      # Auth & validation
├── utils/          # Helper functions
└── server.ts       # Application entry
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Data
- `GET /api/user/profile` - User profile
- `GET /api/user/dashboard` - Dashboard data

### Courses
- `GET /api/courses` - All courses
- `GET /api/courses/enrolled` - User's enrolled courses
- `POST /api/courses/:id/enroll` - Enroll in course

## 🔧 Configuration

### Environment Variables

**Backend (`.env.production`):**
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=https://yourdomain.com
```

**Frontend (`.env.production`):**
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_ENVIRONMENT=production
```

## 📊 Database Schema

- **Users** - Authentication and profile data
- **Courses** - Course catalog and metadata
- **Enrollments** - User course relationships
- **Achievements** - Progress tracking and badges

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Context API for state management
- Axios for API calls

**Backend:**
- Node.js with Express
- TypeScript for type safety
- SQLite with Sequelize ORM
- JWT for authentication
- bcrypt for password hashing

**DevOps:**
- Docker & Docker Compose
- PM2 process manager
- Nginx reverse proxy
- GitHub Actions ready

## 📈 Features Roadmap

- [ ] Real-time notifications
- [ ] Course progress analytics
- [ ] Social learning features
- [ ] Mobile app (React Native)
- [ ] Advanced reporting dashboard

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🚨 Troubleshooting

**Common Issues:**

1. **Port conflicts:** Change ports in environment files
2. **Database locked:** Stop all processes and restart
3. **CORS errors:** Update ALLOWED_ORIGINS in backend
4. **Build fails:** Clear node_modules and reinstall

**Get Help:**
- Check logs: `npm run docker:logs`
- Health check: `curl http://localhost:3001/health`
- Reset database: `npm run backend:seed`

## 📞 Support

For issues and questions:
- Create GitHub issue
- Check deployment docs in `backend/DEPLOYMENT.md`
- Review logs in `backend/logs/` directory