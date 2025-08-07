import React, { useState, useEffect } from 'react';
import { User, Calendar, Award, BookOpen, Clock, Edit, Save, X, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { StudentWithAchievements } from '../types';
import apiService from '../services/api';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState<StudentWithAchievements | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiService.getDashboardData();
        const studentInfo = data as StudentWithAchievements;
        setStudentData(studentInfo);
        setEditForm({
          name: studentInfo.name || '',
          email: studentInfo.email || '',
        });
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSave = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (studentData) {
      setEditForm({
        name: studentData.name || '',
        email: studentData.email || '',
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading your profile..." />;
  }

  if (error || !studentData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Failed to Load Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'Unable to load profile data'}
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

  const totalHours = Math.round(studentData.studyStats.overall);
  const completedCourses = studentData.enrolledSubjects.filter(
    subject => subject.testsCompleted === subject.totalTests
  ).length;
  const unlockedAchievements = studentData.achievements.filter(a => a.isUnlocked).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your account and view your learning progress</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex items-start -mt-16 mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors duration-200">
                  <Camera size={14} />
                </button>
              </div>
              
              <div className="ml-6 mt-4 flex-grow">
                {!isEditing ? (
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {studentData.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {studentData.email}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={16} className="mr-1" />
                        Member since January 2024
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                      >
                        <Save size={16} className="mr-1" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                      >
                        <X size={16} className="mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{totalHours}h</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Study Time</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{completedCourses}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Courses Completed</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{unlockedAchievements}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Achievements</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 dark:text-purple-400 text-xl">🔥</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{studentData.currentStreak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-gray-900 dark:text-white font-medium">Completed "Differentiation Rules" lesson</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Calculus I course • 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Award className="text-green-600 dark:text-green-400" size={20} />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-gray-900 dark:text-white font-medium">Earned "Test Ace" achievement</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Scored 90%+ on 5 tests • 3 days ago</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400 text-lg">🔥</span>
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-gray-900 dark:text-white font-medium">Reached 12-day study streak</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Keep it up! • 1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Receive updates about your courses and achievements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Study Reminders</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Get reminded to maintain your study streak</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;