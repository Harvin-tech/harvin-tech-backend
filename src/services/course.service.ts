import { createError } from "../hooks";
import { CONFLICT } from "../types/errors.type";
import { Course } from "../models";
import { addCourse_I } from "../types/course.type";

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
}   
