import React from 'react';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';
import { Subject } from '../types';

interface SubjectsCardProps {
  subjects: Subject[];
}

const SubjectsCard: React.FC<SubjectsCardProps> = ({ subjects }) => {
  const formatLastActivity = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!dateObj || isNaN(dateObj.getTime())) {
      return 'Unknown';
    }
    
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <BookOpen className="mr-3 text-green-600" size={28} />
        My Subjects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => {
          const completionRate = (subject.testsCompleted / subject.totalTests) * 100;
          
          return (
            <div
              key={subject.id}
              className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 p-4 hover:shadow-md transition-all duration-200"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${subject.color}`}></div>
              
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {subject.totalHours}h studied
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {subject.testsCompleted}/{subject.totalTests}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">tests</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(completionRate)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${subject.color} transition-all duration-300`}
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock size={14} className="mr-1" />
                    {formatLastActivity(subject.lastActivity)}
                  </div>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <TrendingUp size={14} className="mr-1" />
                    Active
                  </div>
                </div>
              </div>
              
              <button className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                Continue Learning
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectsCard;