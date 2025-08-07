import { Student, Subject, TestMilestone, StudyStats, Achievement, StudentWithAchievements } from '../types';

export const studyStats: StudyStats = {
  overall: 247.5,
  yearToDate: 156.25,
  monthToDate: 32.75,
  currentWeek: 8.5
};

export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    color: 'from-blue-500 to-blue-600',
    totalHours: 85.5,
    testsCompleted: 7,
    totalTests: 10,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: '2',
    name: 'Computer Science',
    color: 'from-green-500 to-green-600',
    totalHours: 92.25,
    testsCompleted: 6,
    totalTests: 8,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 6)
  },
  {
    id: '3',
    name: 'Physics',
    color: 'from-purple-500 to-purple-600',
    totalHours: 67.75,
    testsCompleted: 5,
    totalTests: 9,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    id: '4',
    name: 'Chemistry',
    color: 'from-orange-500 to-orange-600',
    totalHours: 43.5,
    testsCompleted: 3,
    totalTests: 7,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 72)
  }
];

export const testMilestones: TestMilestone[] = [
  {
    id: '1',
    subjectId: '2',
    testName: 'Data Structures & Algorithms',
    score: 94,
    maxScore: 100,
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    difficulty: 'Hard'
  },
  {
    id: '2',
    subjectId: '1',
    testName: 'Calculus II Midterm',
    score: 87,
    maxScore: 100,
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    difficulty: 'Medium'
  },
  {
    id: '3',
    subjectId: '3',
    testName: 'Quantum Mechanics Quiz',
    score: 76,
    maxScore: 80,
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    difficulty: 'Hard'
  },
  {
    id: '4',
    subjectId: '4',
    testName: 'Organic Chemistry Lab',
    score: 82,
    maxScore: 90,
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    difficulty: 'Medium'
  },
  {
    id: '5',
    subjectId: '1',
    testName: 'Linear Algebra Quiz',
    score: 95,
    maxScore: 100,
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    difficulty: 'Easy'
  }
];

export const achievements: Achievement[] = [
  // Streak Achievements
  {
    id: 'streak_3',
    title: 'Study Starter',
    description: 'Study for 3 days in a row',
    icon: '🔥',
    category: 'streak',
    type: 'bronze',
    isUnlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    progress: 3,
    maxProgress: 3,
    requirement: '3 day study streak'
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Complete a perfect 7-day study streak',
    icon: '⚡',
    category: 'streak',
    type: 'silver',
    isUnlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    progress: 7,
    maxProgress: 7,
    requirement: '7 day study streak'
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Achieve a 30-day study streak',
    icon: '💎',
    category: 'streak',
    type: 'gold',
    isUnlocked: false,
    progress: 12,
    maxProgress: 30,
    requirement: '30 day study streak'
  },
  {
    id: 'streak_100',
    title: 'Century Scholar',
    description: 'Unstoppable! 100-day study streak',
    icon: '👑',
    category: 'streak',
    type: 'platinum',
    isUnlocked: false,
    progress: 12,
    maxProgress: 100,
    requirement: '100 day study streak'
  },

  // Time-based Achievements
  {
    id: 'time_50',
    title: 'First Sprint',
    description: 'Complete 50 hours of study time',
    icon: '🎯',
    category: 'milestone',
    type: 'bronze',
    isUnlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    progress: 50,
    maxProgress: 50,
    requirement: '50 study hours'
  },
  {
    id: 'time_100',
    title: 'Dedicated Learner',
    description: 'Reach 100 hours of focused study',
    icon: '🚀',
    category: 'milestone',
    type: 'silver',
    isUnlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    progress: 100,
    maxProgress: 100,
    requirement: '100 study hours'
  },
  {
    id: 'time_250',
    title: 'Study Champion',
    description: 'Amazing! 250 hours of learning',
    icon: '🏆',
    category: 'milestone',
    type: 'gold',
    isUnlocked: false,
    progress: 247,
    maxProgress: 250,
    requirement: '250 study hours'
  },

  // Performance Achievements
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Get 100% on any test',
    icon: '⭐',
    category: 'performance',
    type: 'silver',
    isUnlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    progress: 1,
    maxProgress: 1,
    requirement: '100% test score'
  },
  {
    id: 'test_ace',
    title: 'Test Ace',
    description: 'Score 90%+ on 5 tests',
    icon: '🎖️',
    category: 'performance',
    type: 'gold',
    isUnlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    progress: 5,
    maxProgress: 5,
    requirement: '5 tests with 90%+'
  },
  {
    id: 'subject_master',
    title: 'Subject Master',
    description: 'Complete all tests in one subject',
    icon: '🧠',
    category: 'performance',
    type: 'platinum',
    isUnlocked: false,
    progress: 7,
    maxProgress: 10,
    requirement: 'Complete all tests in Math'
  },

  // Challenge Achievements
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Study before 7 AM for 5 days',
    icon: '🌅',
    category: 'challenge',
    type: 'bronze',
    isUnlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    progress: 5,
    maxProgress: 5,
    requirement: 'Study before 7 AM'
  },
  {
    id: 'weekend_warrior',
    title: 'Weekend Warrior',
    description: 'Study on both weekend days',
    icon: '⚔️',
    category: 'challenge',
    type: 'silver',
    isUnlocked: true,
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    progress: 1,
    maxProgress: 1,
    requirement: 'Weekend study session'
  },
  {
    id: 'multi_subject',
    title: 'Multi-Tasker',
    description: 'Study 3+ subjects in one day',
    icon: '🎭',
    category: 'challenge',
    type: 'gold',
    isUnlocked: false,
    progress: 2,
    maxProgress: 3,
    requirement: '3 subjects in one day'
  }
];

export const student: Student = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=60',
  enrolledSubjects: subjects,
  studyStats,
  recentTests: testMilestones
};

export const studentWithAchievements: StudentWithAchievements = {
  ...student,
  achievements,
  currentStreak: 12,
  longestStreak: 15,
  totalStudyDays: 89
};