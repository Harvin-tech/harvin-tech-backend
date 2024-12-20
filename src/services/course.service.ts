import { createError } from "../hooks";
import { Course } from "../models";
import { addCourse_I, getCourse_I } from "../types/course.type";

export class CourseService {
    static async addCourse(requestBody: addCourse_I) {
        const isCourseExist = await Course.findOne({ title: requestBody.title });
        if (isCourseExist) {
            throw createError(
                'COURSE_ALREADY_EXISTS',
                400,
                'Course already exists'
            );
        }
        const course = new Course(requestBody);
        await course.save();

        const response = {
            course: { ...course },
        }
        return response;

    }
    static async getCourse(query: getCourse_I) {
        const courseQuery = query.query;
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const [courses, total] = await Promise.all([
            Course.find(courseQuery)
                .skip(skip)
                .limit(limit),
            Course.countDocuments(courseQuery)
        ]);
        if (!courses) {
            throw createError(
                'COURSE_NOT_FOUND',
                404,
                'Course not found'
            );
        }

        return {
            courses,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    // Get first page with 10 items
    // await CourseService.getCourse({ query: {} });

    // Get second page with 20 items
    // await CourseService.getCourse({ query: {}, page: 2, limit: 20 });

    // Get first page of courses in a specific category
    // await CourseService.getCourse({ query: { category: 'programming' }, page: 1, limit: 10 });
}   
