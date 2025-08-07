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
  syllabus: CourseSyllabus[];
}

export interface CourseSyllabus {
  id: string;
  title: string;
  lessons: CourseLesson[];
  duration: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  isCompleted?: boolean;
  isLocked?: boolean;
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

export interface TestMilestone {
  id: string;
  subjectId: string;
  testName: string;
  score: number;
  maxScore: number;
  completedAt: Date;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledSubjects: Subject[];
  studyStats: StudyStats;
  recentTests: TestMilestone[];
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
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

export interface StudentWithAchievements extends Student {
  achievements: Achievement[];
  currentStreak: number;
  longestStreak: number;
  totalStudyDays: number;
}