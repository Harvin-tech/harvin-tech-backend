import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { readBody, sendResponse } from "../hooks";
import { addCourse_I } from "../types/course.type"; 
import { CourseService } from "../services/course.service";

export class CourseController {
    static async addCourse(request: FastifyRequest, reply: FastifyReply) {
        try {
            const requestBody = readBody<addCourse_I>(request);

            const course = await CourseService.addCourse(requestBody);

            return sendResponse(reply, 200, 'Course added successfully', course);
        } catch (error) {
            console.error('ERROR_ADD_COURSE', error);
            throw error;
        }
    }
}
