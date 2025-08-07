import React, { useState } from 'react';
import { Trophy, Flame, Target, Zap, Award } from 'lucide-react';
import { StudentWithAchievements } from '../types';

interface AchievementsCardProps {
  student: StudentWithAchievements;
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({ student }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'streak', name: 'Streaks', icon: Flame },
    { id: 'milestone', name: 'Milestones', icon: Target },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'challenge', name: 'Challenges', icon: Award }
  ];

  const getTypeStyles = (type: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        bg: 'bg-gray-100 dark:bg-gray-700',
        border: 'border-gray-300 dark:border-gray-600',
        text: 'text-gray-400 dark:text-gray-500'
      };
    }

    switch (type) {
      case 'bronze':
        return {
          bg: 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900',
          border: 'border-amber-300 dark:border-amber-700',
          text: 'text-amber-800 dark:text-amber-200'
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-800 dark:to-slate-800',
          border: 'border-gray-400 dark:border-gray-600',
          text: 'text-gray-700 dark:text-gray-300'
        };
      case 'gold':
        return {
          bg: 'bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-900 dark:to-amber-900',
          border: 'border-yellow-400 dark:border-yellow-600',
          text: 'text-yellow-800 dark:text-yellow-200'
        };
      case 'platinum':
        return {
          bg: 'bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-900 dark:to-purple-900',
          border: 'border-indigo-400 dark:border-indigo-600',
          text: 'text-indigo-800 dark:text-indigo-200'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          border: 'border-gray-300 dark:border-gray-600',
          text: 'text-gray-700 dark:text-gray-300'
        };
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? student.achievements 
    : student.achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = student.achievements.filter(a => a.isUnlocked).length;
  const totalCount = student.achievements.length;

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Trophy className="text-yellow-600 dark:text-yellow-400" size={28} />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Achievements
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {unlockedCount}/{totalCount} unlocked
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {student.currentStreak} 🔥
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Current Streak
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <IconComponent size={16} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => {
          const styles = getTypeStyles(achievement.type, achievement.isUnlocked);
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

          return (
            <div
              key={achievement.id}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                achievement.isUnlocked ? 'hover:scale-105' : ''
              } ${styles.bg} ${styles.border}`}
            >
              {achievement.isUnlocked && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-3">
                <div className={`text-3xl mb-2 ${achievement.isUnlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <h3 className={`font-bold text-lg ${styles.text}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${styles.text} opacity-80`}>
                  {achievement.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={`${styles.text} opacity-70`}>
                    {achievement.requirement}
                  </span>
                  <span className={`font-medium ${styles.text}`}>
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>

                <div className="w-full h-2 bg-black bg-opacity-10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      achievement.isUnlocked 
                        ? 'bg-green-500' 
                        : achievement.type === 'bronze' ? 'bg-amber-500' :
                          achievement.type === 'silver' ? 'bg-gray-500' :
                          achievement.type === 'gold' ? 'bg-yellow-500' :
                          'bg-indigo-500'
                    }`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>

                {achievement.isUnlocked && achievement.unlockedAt && (
                  <div className={`text-xs ${styles.text} opacity-60 text-center mt-2`}>
                    Unlocked {formatDate(achievement.unlockedAt)}
                  </div>
                )}
              </div>

              <div className={`absolute top-2 left-2 text-xs font-bold uppercase tracking-wide ${styles.text} opacity-60`}>
                {achievement.type}
              </div>
            </div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Trophy size={48} className="mx-auto mb-4 opacity-50" />
          <p>No achievements in this category yet.</p>
          <p className="text-sm">Keep studying to unlock rewards!</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 rounded-lg border border-orange-200 dark:border-orange-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏃‍♀️</div>
            <div>
              <p className="font-medium text-orange-800 dark:text-orange-200">
                Keep Your Streak Alive!
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-300">
                Longest streak: {student.longestStreak} days • Total study days: {student.totalStudyDays}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Next milestone
            </div>
            <div className="text-lg font-bold text-orange-800 dark:text-orange-200">
              {student.currentStreak < 30 ? `${30 - student.currentStreak} days to Monthly Master` : 
               student.currentStreak < 100 ? `${100 - student.currentStreak} days to Century Scholar` : 
               'All streak milestones achieved!'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsCard;