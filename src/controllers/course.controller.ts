import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { readBody, readQuery, sendResponse } from '../hooks';
import { addCourse_I, getCourse_I } from '../types/course.type';
import { CourseService } from '../services/course.service';

export class CourseController {
  static async addCourse(request: FastifyRequest, reply: FastifyReply) {
    try {
      const requestBody = readBody<addCourse_I>(request);
      console.log('dsfghjkl', readBody);

      const course = await CourseService.addCourse(requestBody);

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
}
