import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// Import database
import { initDatabase } from './database/config';

// Import routes
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import userRoutes from './routes/user';

// Import utils
import { APIResponseUtil } from './utils/response';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

if (process.env.NODE_ENV === 'production') {
  app.use(limiter);
}

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? (process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || ['http://localhost:3000'])
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

console.log('CORS allowed origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    console.warn('CORS blocked origin:', origin);
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Set-Cookie']
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  APIResponseUtil.success(res, {
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  }, 'Server is healthy');
});

// CORS debug endpoint
app.get('/debug/cors', (req, res) => {
  APIResponseUtil.success(res, {
    origin: req.headers.origin,
    allowedOrigins: allowedOrigins,
    headers: req.headers,
    method: req.method,
    corsEnabled: true
  }, 'CORS debug information');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/user', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  APIResponseUtil.success(res, {
    name: 'Student Dashboard API',
    version: '1.0.0',
    description: 'Backend API for Student Learning Dashboard',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/courses',
      user: '/api/user',
      health: '/health'
    }
  }, 'Student Dashboard API is running');
});

// 404 handler
app.use('*', (req, res) => {
  APIResponseUtil.notFound(res, `Route ${req.originalUrl} not found`);
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.error('Global error handler:', error);
  
  if (error.type === 'entity.parse.failed') {
    APIResponseUtil.badRequest(res, 'Invalid JSON in request body');
    return;
  }
  
  if (error.type === 'entity.too.large') {
    APIResponseUtil.badRequest(res, 'Request body too large');
    return;
  }
  
  APIResponseUtil.error(res, 'Internal server error');
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database
    await initDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`
🚀 Student Dashboard API Server Started!
📊 Environment: ${process.env.NODE_ENV || 'development'}
🌐 Server: http://localhost:${PORT}
🏥 Health: http://localhost:${PORT}/health
📚 API Docs: http://localhost:${PORT}/
💾 Database: SQLite (database.sqlite)
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;