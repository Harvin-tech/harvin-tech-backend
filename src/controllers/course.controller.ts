import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { readBody, readParams, readQuery, sendResponse } from '../hooks';
import {
  createCourse_I,
  getCourse_I,
  updateCourse_I,
} from '../types/course.type';
import { CourseService } from '../services/course.service';

export class CourseController {
  static async addCourse(request: FastifyRequest, reply: FastifyReply) {
    try {
      const requestBody = readBody<createCourse_I>(request);
      console.log('dsfghjkl', requestBody);

      const course = await CourseService.createCourse(requestBody);

      return sendResponse(reply, 200, 'Course added successfully', course);
    } catch (error) {
      console.error('ERROR_ADD_COURSE', error);
      throw error;
    }
  }

  static async getCourse(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reqQuery = readQuery<getCourse_I>(request);

      const course = await CourseService.getAllCourse(reqQuery);

      return sendResponse(reply, 200, 'Course fetched successfully', course);
    } catch (error) {
      console.error('ERROR_GET_COURSE', error);
      throw error;
    }
  }

  static async updateCourse(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { courseId } = readParams<{ courseId: string }>(request); // Extract userId from request params
      const reqBody = readBody<updateCourse_I>(request); // Extract request body

      const updatedUser = await CourseService.updateCourseById(
        courseId,
        reqBody
      );

      return sendResponse(reply, 200, 'User updated successfully', updatedUser);
    } catch (error) {
      throw error;
    }
  }

  static async getCourseById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { courseId } = readParams<{ courseId: string }>(request); // Extract userId from request params

      const course = await CourseService.getCourseById(courseId);

      return sendResponse(reply, 200, 'Course fetched successfully', course);
    } catch (error) {
      throw error;
    }
  }
}
