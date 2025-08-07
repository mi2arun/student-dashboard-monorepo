import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface CourseImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
}

const CourseImage: React.FC<CourseImageProps> = ({ 
  src, 
  alt, 
  className = '',
  fallbackColor = 'from-blue-500 to-purple-500'
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div className={`${className} bg-gradient-to-br ${fallbackColor} flex items-center justify-center`}>
        <div className="text-center text-white">
          <BookOpen size={48} className="mx-auto mb-2 opacity-80" />
          <p className="text-sm opacity-80 px-4">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColor} flex items-center justify-center animate-pulse`}>
          <BookOpen size={48} className="text-white opacity-50" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
};

export default CourseImage;