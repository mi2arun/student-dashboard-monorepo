export interface StudyStats {
  overall: number;
  yearToDate: number;
  monthToDate: number;
  currentWeek: number;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  totalHours: number;
  testsCompleted: number;
  totalTests: number;
  lastActivity: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  totalLessons: number;
  totalTests: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  image: string;
  tags: string[];
  enrollmentCount: number;
  isPopular?: boolean;
  isNew?: boolean;
  prerequisites?: string[];
  learningOutcomes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EnrolledCourse extends Course {
  enrolledAt: Date;
  progress: number;
  completedLessons: number;
  lastAccessedAt: Date;
  currentLesson?: string;
  timeSpent: number;
  certificateEarned?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'milestone' | 'performance' | 'challenge';
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  requirement: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  preferences: {
    emailNotifications: boolean;
    studyReminders: boolean;
    theme: 'light' | 'dark' | 'system';
  };
}

export interface StudentProfile extends Omit<User, 'password'> {
  enrolledSubjects: Subject[];
  studyStats: StudyStats;
  achievements: Achievement[];
  currentStreak: number;
  longestStreak: number;
  totalStudyDays: number;
}

export interface TestMilestone {
  id: string;
  subjectId: string;
  testName: string;
  score: number;
  maxScore: number;
  completedAt: Date;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
  expiresIn: string;
}