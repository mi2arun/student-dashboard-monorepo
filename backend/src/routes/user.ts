import { Router, Request, Response } from 'express';
import { APIResponseUtil } from '../utils/response';
import { authenticateToken } from '../middleware/auth';
import { User } from '../database/models/User';
import { 
  getUserEnrolledCourses, 
  getUserAchievements,
  mockStudyStats,
  mockSubjects,
  mockTestMilestones
} from '../data/mockData';
import { StudentProfile } from '../types';

const router = Router();

// GET /api/user/profile - Get user profile with dashboard data
router.get('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId!;
    const user = await User.findByPk(userId);

    if (!user) {
      return APIResponseUtil.notFound(res, 'User not found');
    }

    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isActive: true,
      preferences: user.preferences,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return APIResponseUtil.success(res, userProfile);
  } catch (error) {
    console.error('Get profile error:', error);
    return APIResponseUtil.error(res, 'Failed to fetch user profile');
  }
});

// PUT /api/user/profile - Update user profile
router.put('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId!;
    const user = await User.findByPk(userId);

    if (!user) {
      return APIResponseUtil.notFound(res, 'User not found');
    }

    const { name, email, preferences } = req.body;

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences };
    }

    await user.save();

    const updatedProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isActive: true,
      preferences: user.preferences,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return APIResponseUtil.success(res, updatedProfile, 'Profile updated successfully');
  } catch (error) {
    console.error('Update profile error:', error);
    return APIResponseUtil.error(res, 'Failed to update profile');
  }
});

// GET /api/user/dashboard - Get dashboard statistics
router.get('/dashboard', authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId!;
    const enrolledCourses = getUserEnrolledCourses(userId);
    const achievements = getUserAchievements(userId);

    const dashboardData = {
      id: userId,
      name: (req as any).user?.name || 'Student',
      email: (req as any).user?.email || '',
      avatar: ((req as any).user as any)?.avatar,
      studyStats: mockStudyStats,
      enrolledSubjects: mockSubjects,
      recentTests: mockTestMilestones,
      achievements,
      currentStreak: 12,
      longestStreak: 15,
      totalStudyDays: 89
    };

    return APIResponseUtil.success(res, dashboardData);
  } catch (error) {
    console.error('Get dashboard error:', error);
    return APIResponseUtil.error(res, 'Failed to fetch dashboard data');
  }
});

// GET /api/user/achievements - Get user achievements
router.get('/achievements', authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId!;
    const achievements = getUserAchievements(userId);

    const { category } = req.query;

    let filteredAchievements = achievements;

    if (category && category !== 'all') {
      filteredAchievements = achievements.filter(a => a.category === category);
    }

    const stats = {
      total: achievements.length,
      unlocked: achievements.filter(a => a.isUnlocked).length,
      byCategory: {
        streak: achievements.filter(a => a.category === 'streak').length,
        milestone: achievements.filter(a => a.category === 'milestone').length,
        performance: achievements.filter(a => a.category === 'performance').length,
        challenge: achievements.filter(a => a.category === 'challenge').length
      },
      byType: {
        bronze: achievements.filter(a => a.type === 'bronze').length,
        silver: achievements.filter(a => a.type === 'silver').length,
        gold: achievements.filter(a => a.type === 'gold').length,
        platinum: achievements.filter(a => a.type === 'platinum').length
      }
    };

    return APIResponseUtil.success(res, {
      achievements: filteredAchievements,
      stats
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    return APIResponseUtil.error(res, 'Failed to fetch achievements');
  }
});

// GET /api/user/study-stats - Get detailed study statistics
router.get('/study-stats', authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId!;
    const enrolledCourses = getUserEnrolledCourses(userId);

    const detailedStats = {
      ...mockStudyStats,
      bySubject: mockSubjects.map(subject => ({
        subject: subject.name,
        hours: subject.totalHours,
        testsCompleted: subject.testsCompleted,
        totalTests: subject.totalTests,
        progress: (subject.testsCompleted / subject.totalTests) * 100
      })),
      byCourse: enrolledCourses.map(course => ({
        title: course.title,
        progress: course.progress,
        timeSpent: course.timeSpent,
        completedLessons: course.completedLessons,
        totalLessons: course.totalLessons
      })),
      weeklyTrend: [
        { week: 'Week 1', hours: 6.5 },
        { week: 'Week 2', hours: 8.2 },
        { week: 'Week 3', hours: 7.8 },
        { week: 'Week 4', hours: 8.5 }
      ]
    };

    return APIResponseUtil.success(res, detailedStats);
  } catch (error) {
    console.error('Get study stats error:', error);
    return APIResponseUtil.error(res, 'Failed to fetch study statistics');
  }
});

export default router;