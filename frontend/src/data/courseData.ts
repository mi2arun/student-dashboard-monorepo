import { Course, EnrolledCourse, CourseSyllabus } from '../types';

const syllabusMath: CourseSyllabus[] = [
  {
    id: 'calc1-m1',
    title: 'Limits and Continuity',
    duration: '2 weeks',
    lessons: [
      { id: 'l1', title: 'Introduction to Limits', duration: '25 min', type: 'video', isCompleted: true },
      { id: 'l2', title: 'Limit Laws', duration: '30 min', type: 'video', isCompleted: true },
      { id: 'l3', title: 'Continuity', duration: '20 min', type: 'reading', isCompleted: true },
      { id: 'l4', title: 'Practice Quiz', duration: '15 min', type: 'quiz', isCompleted: true }
    ]
  },
  {
    id: 'calc1-m2',
    title: 'Derivatives',
    duration: '3 weeks',
    lessons: [
      { id: 'l5', title: 'Definition of Derivative', duration: '35 min', type: 'video', isCompleted: true },
      { id: 'l6', title: 'Differentiation Rules', duration: '40 min', type: 'video', isCompleted: false },
      { id: 'l7', title: 'Chain Rule', duration: '30 min', type: 'video', isCompleted: false },
      { id: 'l8', title: 'Applications', duration: '45 min', type: 'assignment', isCompleted: false, isLocked: true }
    ]
  }
];

const syllabusCS: CourseSyllabus[] = [
  {
    id: 'dsa-m1',
    title: 'Arrays and Strings',
    duration: '2 weeks',
    lessons: [
      { id: 'cs1', title: 'Array Fundamentals', duration: '30 min', type: 'video', isCompleted: true },
      { id: 'cs2', title: 'String Manipulation', duration: '25 min', type: 'video', isCompleted: true },
      { id: 'cs3', title: 'Two Pointers Technique', duration: '35 min', type: 'video', isCompleted: true },
      { id: 'cs4', title: 'Coding Practice', duration: '60 min', type: 'assignment', isCompleted: false }
    ]
  },
  {
    id: 'dsa-m2',
    title: 'Linked Lists',
    duration: '2 weeks',
    lessons: [
      { id: 'cs5', title: 'Linked List Basics', duration: '40 min', type: 'video', isCompleted: false },
      { id: 'cs6', title: 'Doubly Linked Lists', duration: '35 min', type: 'video', isCompleted: false },
      { id: 'cs7', title: 'Advanced Operations', duration: '45 min', type: 'video', isCompleted: false, isLocked: true }
    ]
  }
];

export const allCourses: Course[] = [
  {
    id: 'math-calculus-1',
    title: 'Calculus I: Limits, Derivatives, and Applications',
    description: 'Master the fundamentals of calculus including limits, derivatives, and their real-world applications. Perfect for students beginning their calculus journey.',
    instructor: 'Dr. Sarah Chen',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format&q=60',
    category: 'Mathematics',
    level: 'Intermediate',
    duration: '12 weeks',
    totalLessons: 48,
    totalTests: 6,
    rating: 4.8,
    reviewCount: 2847,
    price: 89,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&auto=format&q=60',
    tags: ['Mathematics', 'Calculus', 'STEM'],
    enrollmentCount: 15420,
    isPopular: true,
    prerequisites: ['Algebra II', 'Trigonometry'],
    learningOutcomes: [
      'Understand limits and continuity',
      'Master differentiation techniques',
      'Apply derivatives to real-world problems',
      'Solve optimization problems'
    ],
    syllabus: syllabusMath
  },
  {
    id: 'cs-data-structures',
    title: 'Data Structures & Algorithms Masterclass',
    description: 'Comprehensive course covering essential data structures and algorithms. Build problem-solving skills for technical interviews and software development.',
    instructor: 'Prof. Michael Rodriguez',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=60',
    category: 'Computer Science',
    level: 'Intermediate',
    duration: '16 weeks',
    totalLessons: 64,
    totalTests: 8,
    rating: 4.9,
    reviewCount: 4521,
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop&auto=format&q=60',
    tags: ['Programming', 'Algorithms', 'Data Structures'],
    enrollmentCount: 23150,
    isPopular: true,
    prerequisites: ['Basic Programming', 'Object-Oriented Programming'],
    learningOutcomes: [
      'Master fundamental data structures',
      'Implement sorting and searching algorithms',
      'Analyze time and space complexity',
      'Prepare for technical interviews'
    ],
    syllabus: syllabusCS
  },
  {
    id: 'physics-mechanics',
    title: 'Classical Mechanics: From Newton to Lagrange',
    description: 'Explore the fundamental principles of classical mechanics, from basic Newtonian physics to advanced Lagrangian formulations.',
    instructor: 'Dr. Elena Vasquez',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face&auto=format&q=60',
    category: 'Physics',
    level: 'Advanced',
    duration: '14 weeks',
    totalLessons: 42,
    totalTests: 7,
    rating: 4.7,
    reviewCount: 1893,
    price: 119,
    image: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=400&h=300&fit=crop&auto=format&q=60',
    tags: ['Physics', 'Mechanics', 'Mathematical Physics'],
    enrollmentCount: 8750,
    prerequisites: ['Calculus I', 'Vector Algebra'],
    learningOutcomes: [
      'Understand Newtonian mechanics',
      'Apply conservation laws',
      'Master rotational dynamics',
      'Introduction to Lagrangian mechanics'
    ],
    syllabus: []
  },
  {
    id: 'chem-organic',
    title: 'Organic Chemistry Fundamentals',
    description: 'Dive into the world of carbon compounds. Learn structure, bonding, nomenclature, and reaction mechanisms in organic chemistry.',
    instructor: 'Prof. James Wilson',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=60',
    category: 'Chemistry',
    level: 'Intermediate',
    duration: '10 weeks',
    totalLessons: 35,
    totalTests: 5,
    rating: 4.6,
    reviewCount: 2156,
    price: 99,
    originalPrice: 139,
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=300&fit=crop&auto=format&q=60',
    tags: ['Chemistry', 'Organic', 'Laboratory'],
    enrollmentCount: 12340,
    prerequisites: ['General Chemistry'],
    learningOutcomes: [
      'Understand organic structure and bonding',
      'Master nomenclature systems',
      'Learn reaction mechanisms',
      'Apply spectroscopic methods'
    ],
    syllabus: []
  },
  {
    id: 'cs-web-dev',
    title: 'Full-Stack Web Development Bootcamp',
    description: 'Complete web development course covering HTML, CSS, JavaScript, React, Node.js, and database integration. Build real-world projects.',
    instructor: 'Alex Thompson',
    instructorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face&auto=format&q=60',
    category: 'Web Development',
    level: 'Beginner',
    duration: '20 weeks',
    totalLessons: 80,
    totalTests: 10,
    rating: 4.9,
    reviewCount: 8921,
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&auto=format&q=60',
    tags: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    enrollmentCount: 45230,
    isPopular: true,
    isNew: true,
    learningOutcomes: [
      'Build responsive web applications',
      'Master modern JavaScript frameworks',
      'Develop backend APIs',
      'Deploy applications to production'
    ],
    syllabus: []
  },
  {
    id: 'math-statistics',
    title: 'Statistics and Probability for Data Science',
    description: 'Essential statistics and probability concepts for data science and machine learning. Includes practical applications with Python.',
    instructor: 'Dr. Lisa Park',
    instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format&q=60',
    category: 'Mathematics',
    level: 'Intermediate',
    duration: '8 weeks',
    totalLessons: 32,
    totalTests: 4,
    rating: 4.7,
    reviewCount: 3456,
    price: 79,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format&q=60',
    tags: ['Statistics', 'Data Science', 'Python'],
    enrollmentCount: 18750,
    isNew: true,
    prerequisites: ['Basic Mathematics', 'Introduction to Programming'],
    learningOutcomes: [
      'Master probability distributions',
      'Perform hypothesis testing',
      'Apply statistical inference',
      'Use Python for statistical analysis'
    ],
    syllabus: []
  },
  {
    id: 'cs-machine-learning',
    title: 'Machine Learning Engineering',
    description: 'Advanced machine learning course covering supervised and unsupervised learning, neural networks, and MLOps practices.',
    instructor: 'Dr. Raj Patel',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=60',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    duration: '18 weeks',
    totalLessons: 72,
    totalTests: 9,
    rating: 4.8,
    reviewCount: 2134,
    price: 249,
    originalPrice: 349,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&auto=format&q=60',
    tags: ['Machine Learning', 'AI', 'Python', 'Deep Learning'],
    enrollmentCount: 9876,
    isPopular: true,
    prerequisites: ['Statistics', 'Linear Algebra', 'Python Programming'],
    learningOutcomes: [
      'Implement ML algorithms from scratch',
      'Build and deploy ML models',
      'Master deep learning techniques',
      'Apply MLOps best practices'
    ],
    syllabus: []
  },
  {
    id: 'design-ui-ux',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn user interface and user experience design principles. Create beautiful, functional designs using industry-standard tools.',
    instructor: 'Maria Garcia',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face&auto=format&q=60',
    category: 'Design',
    level: 'Beginner',
    duration: '12 weeks',
    totalLessons: 48,
    totalTests: 6,
    rating: 4.9,
    reviewCount: 5678,
    price: 179,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop&auto=format&q=60',
    tags: ['Design', 'UI/UX', 'Figma', 'User Research'],
    enrollmentCount: 21450,
    isNew: true,
    learningOutcomes: [
      'Master design thinking process',
      'Create wireframes and prototypes',
      'Conduct user research',
      'Design accessible interfaces'
    ],
    syllabus: []
  }
];

export const enrolledCourses: EnrolledCourse[] = [
  {
    ...allCourses.find(c => c.id === 'math-calculus-1')!,
    enrolledAt: new Date('2024-01-15'),
    progress: 65,
    completedLessons: 31,
    lastAccessedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    currentLesson: 'Differentiation Rules',
    timeSpent: 85.5,
    certificateEarned: false
  },
  {
    ...allCourses.find(c => c.id === 'cs-data-structures')!,
    enrolledAt: new Date('2024-02-01'),
    progress: 45,
    completedLessons: 29,
    lastAccessedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    currentLesson: 'Linked List Basics',
    timeSpent: 67.25,
    certificateEarned: false
  },
  {
    ...allCourses.find(c => c.id === 'physics-mechanics')!,
    enrolledAt: new Date('2024-01-20'),
    progress: 78,
    completedLessons: 33,
    lastAccessedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    currentLesson: 'Rotational Dynamics',
    timeSpent: 92.75,
    certificateEarned: false
  },
  {
    ...allCourses.find(c => c.id === 'chem-organic')!,
    enrolledAt: new Date('2024-03-01'),
    progress: 32,
    completedLessons: 11,
    lastAccessedAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    currentLesson: 'Functional Groups',
    timeSpent: 28.5,
    certificateEarned: false
  }
];