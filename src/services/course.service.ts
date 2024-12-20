import { createError } from '../hooks';
import { Course } from '../models';
import { addCourse_I, getCourse_I } from '../types/course.type';
import { BAD_REQUEST } from '../types/errors.type';

export class CourseService {
  static async addCourse(requestBody: addCourse_I) {
    const isCourseExist = await Course.findOne({ title: requestBody.title });

    if (isCourseExist) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        'Course already exists'
      );
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

  static async updateCourseById(courseId: string, requestBody: any) {
    const { title } = requestBody;
    // Find the course by ID and update it
    const isCourseExist = await Course.findOne({ _id: courseId });

    if (!isCourseExist) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        'Course not found'
      );
    }

    if (title) {
      const isTitleExist = await Course.findOne({ title });

      if (isTitleExist) {
        throw createError(
          BAD_REQUEST.name,
          BAD_REQUEST.status,
          'Title already exists'
        );
      }
    }

    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      { $set: requestBody },
      { new: true }
    );

    if (!course) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        'Failed to update course'
      );
    }

    return { course: course['_doc'] };
  }

  static async getCourseById(courseId: string) {
    const course = await Course.findById(courseId);

    if (!course) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        'Course not found'
      );
    }

    return course;
  }
}
