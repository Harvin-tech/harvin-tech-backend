import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { readBody, readParams, readQuery, sendResponse } from '../hooks';
import {
  createCourse_I,
  enrollCourse_I,
  getCourse_I,
  getEnrolledCourse_I,
  getEnrolledCoursesQuery_I,
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
      const { status } = readQuery<{ status: number }>(request);

      const course = await CourseService.getCourseById(courseId, status);

      return sendResponse(reply, 200, 'Course fetched successfully', course);
    } catch (error) {
      throw error;
    }
  }

  static async getChapterById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { chapterId } = readParams<{ chapterId: string }>(request); // Extract userId from request params
      const { status } = readQuery<{ status: number }>(request);

      const chapter = await CourseService.getChapterById(chapterId, status);

      return sendResponse(reply, 200, 'Chapter fetched successfully', chapter);
    } catch (error) {
      throw error;
    }
  }

  static async enrollCourse(request: FastifyRequest, reply: FastifyReply) {
    try {
      const requestBody = readBody<enrollCourse_I>(request);

      const enroll = await CourseService.enrollCourse(requestBody);

      return sendResponse(reply, 200, 'Course enrolled successfully', enroll);
    } catch (error) {
      throw error;
    }
  }

  static async getEnrolledCourseDetails(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const reqQuery = readQuery<getEnrolledCourse_I>(request);

      const course = await CourseService.getEnrolledAllCourse(reqQuery);

      return sendResponse(reply, 200, 'Course fetched successfully', course);
    } catch (error) {
      console.error('ERROR_GET_COURSE', error);
      throw error;
    }
  }

  static async getEnrolledCourseByUser(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { userId } = readParams<{ userId: string }>(request); // Extract userId from request params

      const reqQuery = readQuery<getEnrolledCoursesQuery_I>(request);

      const course = await CourseService.getEnrolledCoursesOfUser(
        userId,
        reqQuery
      );

      return sendResponse(reply, 200, 'Course fetched successfully', course);
    } catch (error) {
      throw error;
    }
  }

  static async getEnrolledStudentsForCourse(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const reqQuery = readQuery<getEnrolledCourse_I>(request);

      const { courseId } = readParams<{ courseId: string }>(request);

      const course = await CourseService.getEnrolledStudentsForCourse(
        courseId,
        reqQuery
      );

      return sendResponse(reply, 200, 'Course fetched successfully', course);
    } catch (error) {
      console.error('ERROR_GET_COURSE', error);
      throw error;
    }
  }
}
