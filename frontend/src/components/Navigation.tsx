import React from 'react';
import { Home, BookOpen, Users, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'my-courses', label: 'My Courses', icon: BookOpen },
    { id: 'all-courses', label: 'All Courses', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-white text-xl font-bold">LearnHub</h1>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-white bg-opacity-20 text-white'
                          : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                      }`}
                    >
                      <IconComponent size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white transition-all duration-200"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-white border-opacity-20 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-white text-sm font-medium hidden sm:block">Sarah Johnson</span>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 w-full text-left ${
                    activeTab === item.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;