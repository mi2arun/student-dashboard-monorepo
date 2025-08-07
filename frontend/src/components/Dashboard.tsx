import React, { useEffect, useState } from 'react';
import { BarChart3, BookOpen, Trophy, TrendingUp } from 'lucide-react';
import StudyStatsCard from './StudyStatsCard';
import SubjectsCard from './SubjectsCard';
import TestMilestonesCard from './TestMilestonesCard';
import AchievementsCard from './AchievementsCard';
import LoadingSpinner from './LoadingSpinner';
import { StudentWithAchievements } from '../types';
import apiService from '../services/api';

const Dashboard: React.FC = () => {
  const [student, setStudent] = useState<StudentWithAchievements | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiService.getDashboardData();
        setStudent(data as StudentWithAchievements);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading your dashboard..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Failed to Load Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }
  const totalTests = student.recentTests.length;
  const averageScore = student.recentTests.reduce((sum, test) => sum + (test.score / test.maxScore) * 100, 0) / totalTests;
  const activeSubjects = student.enrolledSubjects.length;
  const totalStudyHours = student.studyStats.overall;

  const quickStats = [
    {
      label: 'Active Subjects',
      value: activeSubjects.toString(),
      icon: BookOpen,
      color: 'from-green-400 to-green-500',
      change: '+2 this month'
    },
    {
      label: 'Total Tests',
      value: totalTests.toString(),
      icon: Trophy,
      color: 'from-purple-400 to-purple-500',
      change: '+5 this month'
    },
    {
      label: 'Avg Score',
      value: `${Math.round(averageScore)}%`,
      icon: TrendingUp,
      color: 'from-blue-400 to-blue-500',
      change: '+8% this month'
    },
    {
      label: 'Study Hours',
      value: `${Math.round(totalStudyHours)}h`,
      icon: BarChart3,
      color: 'from-orange-400 to-orange-500',
      change: '+12h this week'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {student.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your learning progress overview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {stat.change}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <StudyStatsCard stats={student.studyStats} />
        
        <AchievementsCard student={student} />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <SubjectsCard subjects={student.enrolledSubjects} />
          </div>
          <div className="xl:col-span-1">
            <TestMilestonesCard tests={student.recentTests} subjects={student.enrolledSubjects} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Keep up the great work! 🌟</h3>
              <p className="text-blue-100 mb-4">
                You're doing amazing! You've studied {student.studyStats.currentWeek}h this week.
              </p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200">
                Set Weekly Goal
              </button>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&auto=format&q=60"
                alt="Study motivation"
                className="w-32 h-32 rounded-full object-cover border-4 border-white border-opacity-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;