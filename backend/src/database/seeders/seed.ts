import 'reflect-metadata';
import sequelize, { initDatabase } from '../config';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { Achievement } from '../models/Achievement';
import { UserAchievement } from '../models/UserAchievement';
import { StudySession } from '../models/StudySession';
import { TestResult } from '../models/TestResult';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Initialize database
    await initDatabase();
    
    // Clear existing data
    await sequelize.sync({ force: true });
    console.log('✅ Database reset complete');

    // Create Users individually to trigger password hashing hooks
    const sarah = await User.create({
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      password: 'password123',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
      currentStreak: 12,
      longestStreak: 15,
      totalStudyDays: 89,
      preferences: {
        emailNotifications: true,
        studyReminders: true,
        theme: 'light'
      }
    });

    const john = await User.create({
        name: 'John Doe',
        email: 'john.doe@email.com',
        password: 'password123',
        currentStreak: 5,
        longestStreak: 10,
        totalStudyDays: 45,
        preferences: {
          emailNotifications: false,
          studyReminders: true,
          theme: 'dark'
        }
    });

    const emily = await User.create({
        name: 'Emily Chen',
        email: 'emily.chen@email.com',
        password: 'password123',
        currentStreak: 8,
        longestStreak: 20,
        totalStudyDays: 120,
        preferences: {
          emailNotifications: true,
          studyReminders: false,
          theme: 'light'
        }
    });

    const users = [sarah, john, emily];
    console.log(`✅ Created ${users.length} users`);

    // Create Courses
    const courses = await Course.bulkCreate([
      {
        title: 'Calculus I: Limits, Derivatives, and Applications',
        description: 'Master the fundamentals of calculus including limits, derivatives, and their real-world applications.',
        instructor: 'Dr. Sarah Chen',
        instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
        category: 'Mathematics',
        level: 'Intermediate',
        duration: '12 weeks',
        totalLessons: 48,
        totalTests: 6,
        rating: 4.8,
        reviewCount: 2847,
        price: 89,
        originalPrice: 129,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        tags: ['Mathematics', 'Calculus', 'STEM'],
        enrollmentCount: 15420,
        isPopular: true,
        prerequisites: ['Algebra II', 'Trigonometry'],
        learningOutcomes: [
          'Understand limits and continuity',
          'Master differentiation techniques',
          'Apply derivatives to real-world problems'
        ]
      },
      {
        title: 'Data Structures & Algorithms Masterclass',
        description: 'Comprehensive course covering essential data structures and algorithms.',
        instructor: 'Prof. Michael Rodriguez',
        instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        category: 'Computer Science',
        level: 'Intermediate',
        duration: '16 weeks',
        totalLessons: 64,
        totalTests: 8,
        rating: 4.9,
        reviewCount: 4521,
        price: 149,
        originalPrice: 199,
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0',
        tags: ['Programming', 'Algorithms', 'Data Structures'],
        enrollmentCount: 23150,
        isPopular: true,
        prerequisites: ['Basic Programming'],
        learningOutcomes: [
          'Master fundamental data structures',
          'Implement sorting algorithms',
          'Analyze complexity'
        ]
      },
      {
        title: 'Physics: Classical Mechanics',
        description: 'Explore the fundamental principles of classical mechanics.',
        instructor: 'Dr. Elena Vasquez',
        instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
        category: 'Physics',
        level: 'Advanced',
        duration: '14 weeks',
        totalLessons: 42,
        totalTests: 7,
        rating: 4.7,
        reviewCount: 1893,
        price: 119,
        image: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b',
        tags: ['Physics', 'Mechanics', 'Mathematical Physics'],
        enrollmentCount: 8750,
        prerequisites: ['Calculus I', 'Vector Algebra'],
        learningOutcomes: [
          'Understand Newtonian mechanics',
          'Apply conservation laws',
          'Master rotational dynamics'
        ]
      },
      {
        title: 'Web Development Bootcamp',
        description: 'Complete web development course covering HTML, CSS, JavaScript, React, and Node.js.',
        instructor: 'Alex Thompson',
        instructorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
        category: 'Web Development',
        level: 'Beginner',
        duration: '20 weeks',
        totalLessons: 80,
        totalTests: 10,
        rating: 4.9,
        reviewCount: 8921,
        price: 299,
        originalPrice: 399,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        tags: ['Web Development', 'JavaScript', 'React', 'Node.js'],
        enrollmentCount: 45230,
        isPopular: true,
        isNew: true,
        learningOutcomes: [
          'Build responsive web applications',
          'Master modern JavaScript frameworks',
          'Develop backend APIs'
        ]
      },
      {
        title: 'Machine Learning Engineering',
        description: 'Advanced machine learning course covering supervised and unsupervised learning.',
        instructor: 'Dr. Raj Patel',
        instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        category: 'Artificial Intelligence',
        level: 'Advanced',
        duration: '18 weeks',
        totalLessons: 72,
        totalTests: 9,
        rating: 4.8,
        reviewCount: 2134,
        price: 249,
        originalPrice: 349,
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
        tags: ['Machine Learning', 'AI', 'Python', 'Deep Learning'],
        enrollmentCount: 9876,
        isPopular: true,
        prerequisites: ['Statistics', 'Linear Algebra', 'Python Programming'],
        learningOutcomes: [
          'Implement ML algorithms from scratch',
          'Build and deploy ML models',
          'Master deep learning techniques'
        ]
      }
    ]);
    console.log(`✅ Created ${courses.length} courses`);

    // Create Enrollments
    const enrollments = await Enrollment.bulkCreate([
      {
        userId: users[0].id,
        courseId: courses[0].id,
        progress: 65,
        completedLessons: 31,
        currentLesson: 'Differentiation Rules',
        timeSpent: 85.5
      },
      {
        userId: users[0].id,
        courseId: courses[1].id,
        progress: 45,
        completedLessons: 29,
        currentLesson: 'Linked List Basics',
        timeSpent: 67.25
      },
      {
        userId: users[1].id,
        courseId: courses[3].id,
        progress: 30,
        completedLessons: 24,
        currentLesson: 'React Components',
        timeSpent: 45.0
      },
      {
        userId: users[2].id,
        courseId: courses[4].id,
        progress: 78,
        completedLessons: 56,
        currentLesson: 'Neural Networks',
        timeSpent: 120.5
      }
    ]);
    console.log(`✅ Created ${enrollments.length} enrollments`);

    // Create Achievements
    const achievements = await Achievement.bulkCreate([
      {
        title: 'Study Starter',
        description: 'Study for 3 days in a row',
        icon: '🔥',
        category: 'streak',
        type: 'bronze',
        maxProgress: 3,
        requirement: '3 day study streak'
      },
      {
        title: 'Week Warrior',
        description: 'Complete a perfect 7-day study streak',
        icon: '⚡',
        category: 'streak',
        type: 'silver',
        maxProgress: 7,
        requirement: '7 day study streak'
      },
      {
        title: 'Monthly Master',
        description: 'Achieve a 30-day study streak',
        icon: '💎',
        category: 'streak',
        type: 'gold',
        maxProgress: 30,
        requirement: '30 day study streak'
      },
      {
        title: 'First Sprint',
        description: 'Complete 50 hours of study time',
        icon: '🎯',
        category: 'milestone',
        type: 'bronze',
        maxProgress: 50,
        requirement: '50 study hours'
      },
      {
        title: 'Test Ace',
        description: 'Score 90%+ on 5 tests',
        icon: '🎖️',
        category: 'performance',
        type: 'gold',
        maxProgress: 5,
        requirement: '5 tests with 90%+'
      }
    ]);
    console.log(`✅ Created ${achievements.length} achievements`);

    // Create User Achievements
    const userAchievements = await UserAchievement.bulkCreate([
      {
        userId: users[0].id,
        achievementId: achievements[0].id,
        isUnlocked: true,
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
        progress: 3
      },
      {
        userId: users[0].id,
        achievementId: achievements[1].id,
        isUnlocked: true,
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        progress: 7
      },
      {
        userId: users[0].id,
        achievementId: achievements[2].id,
        isUnlocked: false,
        progress: 12
      }
    ]);
    console.log(`✅ Created ${userAchievements.length} user achievements`);

    // Create Study Sessions
    const studySessions = await StudySession.bulkCreate([
      {
        userId: users[0].id,
        subject: 'Mathematics',
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
        endTime: new Date(),
        duration: 2.0,
        notes: 'Studied derivatives and limits'
      },
      {
        userId: users[0].id,
        subject: 'Computer Science',
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 22),
        duration: 2.0,
        notes: 'Practiced sorting algorithms'
      }
    ]);
    console.log(`✅ Created ${studySessions.length} study sessions`);

    // Create Test Results
    const testResults = await TestResult.bulkCreate([
      {
        userId: users[0].id,
        courseId: courses[1].id,
        subjectId: '2',
        testName: 'Data Structures & Algorithms',
        score: 94,
        maxScore: 100,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        difficulty: 'Hard'
      },
      {
        userId: users[0].id,
        courseId: courses[0].id,
        subjectId: '1',
        testName: 'Calculus II Midterm',
        score: 87,
        maxScore: 100,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        difficulty: 'Medium'
      }
    ]);
    console.log(`✅ Created ${testResults.length} test results`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();