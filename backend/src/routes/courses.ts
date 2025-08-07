import { Router, Request, Response } from 'express';
import { APIResponseUtil } from '../utils/response';
import { authenticateToken, optionalAuth } from '../middleware/auth';
import { 
  getAllCourses, 
  getUserEnrolledCourses, 
  findCourseById,
  mockEnrolledCourses 
} from '../data/mockData';

const router = Router();

// GET /api/courses - Get all available courses
router.get('/', optionalAuth, (req: Request, res: Response) => {
  try {
    const { category, level, search, sort } = req.query;
    let courses = getAllCourses();

    // Filter by category
    if (category && category !== 'All') {
      courses = courses.filter(course => course.category === category);
    }

    // Filter by level
    if (level && level !== 'All') {
      courses = courses.filter(course => course.level === level);
    }

    // Search functionality
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      courses = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.instructor.toLowerCase().includes(searchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sorting
    switch (sort) {
      case 'popular':
        courses = courses.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
        break;
      case 'newest':
        courses = courses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'rating':
        courses = courses.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        courses = courses.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        courses = courses.sort((a, b) => b.price - a.price);
        break;
      default:
        courses = courses.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
    }

    return APIResponseUtil.success(res, {
      courses,
      total: courses.length,
      categories: [...new Set(getAllCourses().map(c => c.category))],
      levels: ['Beginner', 'Intermediate', 'Advanced']
    });
  } catch (error) {
    console.error('Get courses error:', error);
    return APIResponseUtil.error(res, 'Failed to fetch courses');
  }
});

// GET /api/courses/:id - Get specific course details
router.get('/:id', optionalAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = findCourseById(id);

    if (!course) {
      return APIResponseUtil.notFound(res, 'Course not found');
    }

    // Check if user is enrolled (if authenticated)
    let isEnrolled = false;
    if ((req as any).user) {
      const enrolledCourses = getUserEnrolledCourses((req as any).user.id);
      isEnrolled = enrolledCourses.some(ec => ec.id === id);
    }

    return APIResponseUtil.success(res, {
      ...course,
      isEnrolled
    });
  } catch (error) {
    console.error('Get course error:', error);
    return APIResponseUtil.error(res, 'Failed to fetch course');
  }
});

// GET /api/courses/enrolled/me - Get user's enrolled courses
router.get('/enrolled/me', authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId!;
    const enrolledCourses = getUserEnrolledCourses(userId);

    const { filter, sort } = req.query;

    let filteredCourses = enrolledCourses;

    // Apply filters
    switch (filter) {
      case 'in-progress':
        filteredCourses = filteredCourses.filter(c => c.progress > 0 && c.progress < 100);
        break;
      case 'completed':
        filteredCourses = filteredCourses.filter(c => c.progress === 100);
        break;
      case 'not-started':
        filteredCourses = filteredCourses.filter(c => c.progress === 0);
        break;
    }

    // Apply sorting
    switch (sort) {
      case 'recent':
        filteredCourses = filteredCourses.sort((a, b) => 
          b.lastAccessedAt.getTime() - a.lastAccessedAt.getTime()
        );
        break;
      case 'progress':
        filteredCourses = filteredCourses.sort((a, b) => b.progress - a.progress);
        break;
      case 'enrolled':
        filteredCourses = filteredCourses.sort((a, b) => 
          b.enrolledAt.getTime() - a.enrolledAt.getTime()
        );
        break;
      case 'alphabetical':
        filteredCourses = filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        filteredCourses = filteredCourses.sort((a, b) => 
          b.lastAccessedAt.getTime() - a.lastAccessedAt.getTime()
        );
    }

    // Calculate statistics
    const stats = {
      total: enrolledCourses.length,
      inProgress: enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length,
      completed: enrolledCourses.filter(c => c.progress === 100).length,
      notStarted: enrolledCourses.filter(c => c.progress === 0).length,
      averageProgress: enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length,
      totalTimeSpent: enrolledCourses.reduce((sum, c) => sum + c.timeSpent, 0),
      certificatesEarned: enrolledCourses.filter(c => c.certificateEarned).length
    };

    return APIResponseUtil.success(res, {
      courses: filteredCourses,
      stats
    });
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    return APIResponseUtil.error(res, 'Failed to fetch enrolled courses');
  }
});

// POST /api/courses/:id/enroll - Enroll in a course
router.post('/:id/enroll', authenticateToken, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId!;

    const course = findCourseById(id);
    if (!course) {
      return APIResponseUtil.notFound(res, 'Course not found');
    }

    const enrolledCourses = getUserEnrolledCourses(userId);
    const isAlreadyEnrolled = enrolledCourses.some(ec => ec.id === id);

    if (isAlreadyEnrolled) {
      return APIResponseUtil.badRequest(res, 'Already enrolled in this course');
    }

    // Create new enrollment (in real app, save to database)
    const newEnrollment = {
      ...course,
      enrolledAt: new Date(),
      progress: 0,
      completedLessons: 0,
      lastAccessedAt: new Date(),
      timeSpent: 0,
      certificateEarned: false
    };

    mockEnrolledCourses.push(newEnrollment);

    return APIResponseUtil.created(res, newEnrollment, 'Successfully enrolled in course');
  } catch (error) {
    console.error('Enroll course error:', error);
    return APIResponseUtil.error(res, 'Failed to enroll in course');
  }
});

// DELETE /api/courses/:id/unenroll - Unenroll from a course
router.delete('/:id/unenroll', authenticateToken, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId!;

    const enrolledCourses = getUserEnrolledCourses(userId);
    const enrollmentIndex = enrolledCourses.findIndex(ec => ec.id === id);

    if (enrollmentIndex === -1) {
      return APIResponseUtil.notFound(res, 'Enrollment not found');
    }

    // Remove enrollment (in real app, delete from database)
    mockEnrolledCourses.splice(enrollmentIndex, 1);

    return APIResponseUtil.success(res, null, 'Successfully unenrolled from course');
  } catch (error) {
    console.error('Unenroll course error:', error);
    return APIResponseUtil.error(res, 'Failed to unenroll from course');
  }
});

export default router;