import React from 'react';
import { Clock, TrendingUp, Calendar, Zap } from 'lucide-react';
import { StudyStats } from '../types';

interface StudyStatsCardProps {
  stats: StudyStats;
}

const StudyStatsCard: React.FC<StudyStatsCardProps> = ({ stats }) => {
  const formatHours = (hours: number) => {
    return `${hours}h ${Math.round((hours % 1) * 60)}m`;
  };

  const statItems = [
    {
      label: 'Overall',
      value: formatHours(stats.overall),
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
    },
    {
      label: 'Year to Date',
      value: formatHours(stats.yearToDate),
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      change: '+8%',
    },
    {
      label: 'Month to Date',
      value: formatHours(stats.monthToDate),
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+15%',
    },
    {
      label: 'Current Week',
      value: formatHours(stats.currentWeek),
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      change: '+25%',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <Clock className="mr-3 text-blue-600" size={28} />
        Study Time Statistics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                  <IconComponent size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {item.change}
                </span>
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {item.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.label}
                </p>
              </div>
              
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-30`}></div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-blue-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Weekly Goal Progress
            </p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {Math.round((stats.currentWeek / 40) * 100)}% Complete
            </p>
          </div>
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((stats.currentWeek / 40) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyStatsCard;