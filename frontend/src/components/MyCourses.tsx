import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, Play, MoreHorizontal, Calendar, TrendingUp, Target } from 'lucide-react';
import CourseImage from './CourseImage';
import LoadingSpinner from './LoadingSpinner';
import { EnrolledCourse } from '../types';
import apiService from '../services/api';

const MyCourses: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiService.getEnrolledCourses();
        const data = response as { courses: EnrolledCourse[] };
        setEnrolledCourses(data.courses || []);
      } catch (error) {
        console.error('Failed to fetch enrolled courses:', error);
        setError(error instanceof Error ? error.message : 'Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const filterOptions = [
    { id: 'all', name: 'All Courses', count: enrolledCourses.length },
    { id: 'in-progress', name: 'In Progress', count: enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length },
    { id: 'completed', name: 'Completed', count: enrolledCourses.filter(c => c.progress === 100).length },
    { id: 'not-started', name: 'Not Started', count: enrolledCourses.filter(c => c.progress === 0).length }
  ];

  const sortOptions = [
    { id: 'recent', name: 'Recently Accessed' },
    { id: 'progress', name: 'Progress' },
    { id: 'enrolled', name: 'Enrollment Date' },
    { id: 'alphabetical', name: 'Alphabetical' }
  ];

  const getFilteredAndSortedCourses = () => {
    let filtered = enrolledCourses;

    // Apply filter
    switch (filter) {
      case 'in-progress':
        filtered = filtered.filter(c => c.progress > 0 && c.progress < 100);
        break;
      case 'completed':
        filtered = filtered.filter(c => c.progress === 100);
        break;
      case 'not-started':
        filtered = filtered.filter(c => c.progress === 0);
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => {
          const dateA = typeof a.lastAccessedAt === 'string' ? new Date(a.lastAccessedAt) : a.lastAccessedAt;
          const dateB = typeof b.lastAccessedAt === 'string' ? new Date(b.lastAccessedAt) : b.lastAccessedAt;
          return dateB.getTime() - dateA.getTime();
        });
      case 'progress':
        return filtered.sort((a, b) => b.progress - a.progress);
      case 'enrolled':
        return filtered.sort((a, b) => {
          const dateA = typeof a.enrolledAt === 'string' ? new Date(a.enrolledAt) : a.enrolledAt;
          const dateB = typeof b.enrolledAt === 'string' ? new Date(b.enrolledAt) : b.enrolledAt;
          return dateB.getTime() - dateA.getTime();
        });
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  };

  const formatLastAccess = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!dateObj || isNaN(dateObj.getTime())) {
      return 'Unknown';
    }
    
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return dateObj.toLocaleDateString();
  };

  const formatDuration = (hours: number) => {
    return `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading your courses..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Failed to Load Courses
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

  const filteredCourses = getFilteredAndSortedCourses();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Courses</h1>
          <p className="text-gray-600 dark:text-gray-300">Continue your learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                <BookOpen size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{enrolledCourses.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Enrolled Courses</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                <TrendingUp size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Average Progress</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                <Clock size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round(enrolledCourses.reduce((sum, c) => sum + c.timeSpent, 0))}h
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Time Spent</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
                <Award size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {enrolledCourses.filter(c => c.certificateEarned).length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Certificates</p>
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setFilter(option.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === option.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.name} ({option.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="relative flex-shrink-0">
                <CourseImage
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                  fallbackColor="from-green-500 to-blue-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                    <MoreHorizontal size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black bg-opacity-70 rounded-lg p-2">
                    <div className="flex items-center justify-between text-white text-xs mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                {/* Title and Instructor - Fixed Height */}
                <div className="mb-4 flex-shrink-0">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 min-h-[3.5rem] flex items-start">
                    <span className="line-clamp-2 leading-tight">
                      {course.title}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    by {course.instructor}
                  </p>
                </div>

                {/* Stats - Fixed Height */}
                <div className="space-y-2 mb-4 flex-shrink-0">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{formatDuration(course.timeSpent)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Target size={14} className="mr-1 flex-shrink-0" />
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">Last: {formatLastAccess(course.lastAccessedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Current Lesson - Variable Height */}
                <div className="mb-4 flex-grow">
                  {course.currentLesson && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200 truncate">
                        Next: {course.currentLesson}
                      </p>
                    </div>
                  )}
                </div>

                {/* Button - Always at bottom */}
                <div className="mt-auto">
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center">
                    <Play size={18} className="mr-2" />
                    {course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={64} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your filters or enroll in new courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;