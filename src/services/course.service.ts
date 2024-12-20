import { createError } from '../hooks';
import { Course } from '../models';
import { addCourse_I, getCourse_I } from '../types/course.type';

export class CourseService {
  static async addCourse(requestBody: addCourse_I) {
    const isCourseExist = await Course.findOne({ title: requestBody.title });

    if (isCourseExist) {
      throw createError('COURSE_ALREADY_EXISTS', 400, 'Course already exists');
    }

    const course = new Course(requestBody);

    await course.save();

    return { course: course['_doc'] };
  }

  static async getAllCourse(query: getCourse_I) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      category,
      minPrice,
      maxPrice,
      level,
    } = query;

    let filter: any = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' }; // Case-insensitive on title
    }

    if (status) {
      filter.status = status; // Add status filter if provided
    }

    if (category) {
      filter.category = category; // Add category filter if provided
    }

    if (minPrice || maxPrice) {
      const mp = minPrice || 0;
      const mxp = maxPrice || Infinity;
      filter.price = { $gte: mp, $lte: mxp };
    }

    const skip = (page - 1) * limit;

    if (level) {
      filter.level = level; // Add level filter if provided
    }

    const [courses, total] = await Promise.all([
      Course.find(filter).skip(skip).limit(limit),
      Course.countDocuments(filter),
    ]);

    const result = {
      course: courses || [],
      total,
      maxPages: Math.ceil(total / limit),
    };

    return result;
  }
}
