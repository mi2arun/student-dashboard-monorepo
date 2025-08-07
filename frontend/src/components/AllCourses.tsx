import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Users, Clock, BookOpen, Play, Heart, TrendingUp, Award, Zap } from 'lucide-react';
import CourseImage from './CourseImage';
import LoadingSpinner from './LoadingSpinner';
import { Course, EnrolledCourse } from '../types';
import apiService from '../services/api';

const AllCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [coursesResponse, enrolledResponse] = await Promise.all([
          apiService.getAllCourses(),
          apiService.getEnrolledCourses()
        ]);
        const coursesData = coursesResponse as { courses: Course[] };
        const enrolledData = enrolledResponse as { courses: EnrolledCourse[] };
        setAllCourses(coursesData.courses || []);
        setEnrolledCourses(enrolledData.courses || []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError(error instanceof Error ? error.message : 'Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = ['All', ...Array.from(new Set(allCourses.map(c => c.category)))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'newest', name: 'Newest First' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' }
  ];

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some(ec => ec.id === courseId);
  };

  const getFilteredAndSortedCourses = () => {
    let filtered = allCourses;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Apply level filter
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
      case 'newest':
        return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  };

  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  const formatEnrollmentCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
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
    return <LoadingSpinner fullScreen text="Loading all courses..." />;
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Courses</h1>
          <p className="text-gray-600 dark:text-gray-300">Discover new skills and advance your learning</p>
        </div>

        {/* Featured Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{allCourses.length}</p>
                <p className="text-sm text-blue-100">Total Courses</p>
              </div>
              <BookOpen size={32} className="text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
                <p className="text-sm text-green-100">Categories</p>
              </div>
              <Award size={32} className="text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{allCourses.filter(c => c.isPopular).length}</p>
                <p className="text-sm text-purple-100">Popular</p>
              </div>
              <TrendingUp size={32} className="text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{allCourses.filter(c => c.isNew).length}</p>
                <p className="text-sm text-orange-100">New Courses</p>
              </div>
              <Zap size={32} className="text-orange-200" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, instructors, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center gap-2"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredCourses.length} of {allCourses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              <div className="relative flex-shrink-0">
                <CourseImage
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  fallbackColor="from-blue-500 to-purple-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  {course.isPopular && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      🔥 Popular
                    </span>
                  )}
                  {course.isNew && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      ✨ New
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                  <Heart size={16} className="text-gray-600 dark:text-gray-300 hover:text-red-500" />
                </button>

                {/* Price */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-black bg-opacity-70 rounded-lg px-2 py-1 text-white">
                    <div className="flex items-center gap-1">
                      {course.originalPrice && (
                        <span className="text-xs line-through text-gray-300">
                          {formatPrice(course.originalPrice)}
                        </span>
                      )}
                      <span className="text-sm font-bold">
                        {formatPrice(course.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                {/* Title and Instructor - Fixed Height */}
                <div className="mb-4 flex-shrink-0">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 min-h-[3.5rem] flex items-start">
                    <span className="line-clamp-2 leading-tight">
                      {course.title}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <img 
                      src={course.instructorAvatar} 
                      alt={course.instructor}
                      className="w-5 h-5 rounded-full flex-shrink-0"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {course.instructor}
                    </p>
                  </div>
                </div>

                {/* Stats - Fixed Height */}
                <div className="space-y-2 mb-4 flex-shrink-0">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Star className="text-yellow-500 mr-1 flex-shrink-0" size={14} />
                      <span className="truncate">{course.rating} ({formatEnrollmentCount(course.reviewCount)})</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Users size={14} className="mr-1 flex-shrink-0" />
                      <span>{formatEnrollmentCount(course.enrollmentCount)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <BookOpen size={14} className="mr-1 flex-shrink-0" />
                      <span>{course.totalLessons} lessons</span>
                    </div>
                  </div>
                </div>

                {/* Tags - Fixed Height */}
                <div className="mb-4 flex-shrink-0 h-6">
                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded truncate">
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        +{course.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Button - Always at bottom */}
                <div className="mt-auto">
                  {isEnrolled(course.id) ? (
                    <button className="w-full py-3 px-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg font-medium border border-green-300 dark:border-green-700 cursor-not-allowed">
                      ✓ Enrolled
                    </button>
                  ) : (
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center group">
                      <Play size={18} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                      Enroll Now
                    </button>
                  )}
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
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;