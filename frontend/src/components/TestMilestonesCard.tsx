import React from 'react';
import { Award, Star, Calendar, TrendingUp } from 'lucide-react';
import { TestMilestone, Subject } from '../types';

interface TestMilestonesCardProps {
  tests: TestMilestone[];
  subjects: Subject[];
}

const TestMilestonesCard: React.FC<TestMilestonesCardProps> = ({ tests, subjects }) => {
  const getSubjectName = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.name || 'Unknown';
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 75) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      Easy: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      Medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      Hard: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!dateObj || isNaN(dateObj.getTime())) {
      return 'Unknown date';
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(dateObj);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <Award className="mr-3 text-purple-600" size={28} />
        Recent Test Milestones
      </h2>
      
      <div className="space-y-4">
        {tests.map((test) => {
          const percentage = (test.score / test.maxScore) * 100;
          
          return (
            <div
              key={test.id}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {test.testName}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyBadge(test.difficulty)}`}>
                      {test.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {getSubjectName(test.subjectId)}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(test.completedAt)}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(test.score, test.maxScore)}`}>
                    {test.score}/{test.maxScore}
                  </div>
                  <div className={`text-sm font-medium ${getScoreColor(test.score, test.maxScore)}`}>
                    {Math.round(percentage)}%
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        percentage >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                        percentage >= 75 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                        percentage >= 60 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                        'bg-gradient-to-r from-red-400 to-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {percentage >= 90 && (
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} className="fill-current" />
                      <span className="text-xs font-medium ml-1">Excellent</span>
                    </div>
                  )}
                  {percentage >= 75 && percentage < 90 && (
                    <div className="flex items-center text-blue-500 dark:text-blue-400">
                      <TrendingUp size={16} />
                      <span className="text-xs font-medium ml-1">Good</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {tests.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Award size={48} className="mx-auto mb-4 opacity-50" />
          <p>No test milestones yet. Keep studying to unlock achievements!</p>
        </div>
      )}
    </div>
  );
};

export default TestMilestonesCard;