import React from 'react';
import { BookOpen } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text, 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="relative">
          <div className={`${sizeClasses[size]} border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className={`${size === 'large' ? 'w-6 h-6' : size === 'medium' ? 'w-4 h-4' : 'w-3 h-3'} text-blue-500 dark:text-blue-400 animate-pulse`} />
          </div>
        </div>
        {text && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;