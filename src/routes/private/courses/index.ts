import { FastifyInstance } from 'fastify';
import { CourseController } from '../../../controllers/course.controller';
import {
  addCourseSchema,
  enrollCourseSchema,
  getChapterByIDSchema,
  getCourseByIDSchema,
  getCourseSchema,
  getEnrolledCourseByUserSchema,
  getEnrolledCourseSchema,
  getLessonByIDSchema,
  updateCourseSchema,
} from '../../../schema/course.schema';

export default async function addCourseRoute(app: FastifyInstance) {
  app.get('/', getCourseSchema, CourseController.getCourse); // get all course Route: GET '/private/course'
  app.post('/', addCourseSchema, CourseController.addCourse); // add course Route: POST '/private/course'
  app.patch('/:courseId', updateCourseSchema, CourseController.updateCourse); // update course Route: PATCH '/private/course/:courseId'
  app.get('/:courseId', getCourseByIDSchema, CourseController.getCourseById); // get course by id Route: GET '/private/course/:courseId'
  app.get(
    '/chapter/:chapterId',
    getChapterByIDSchema,
    CourseController.getChapterById
  ); // get course by chapter id Route: GET '/private/course/chapter/:chapterId'
  app.post('/enroll', enrollCourseSchema, CourseController.enrollCourse); // enroll course Route: POST '/private/course/enroll'
  app.get(
    '/enroll/:courseId',
    getEnrolledCourseSchema,
    CourseController.getEnrolledStudentsForCourse
  );
  app.get(
    '/enroll/details',
    getEnrolledCourseSchema,
    CourseController.getEnrolledCourseDetails
  ); // get course details Route: GET '/private/course/enroll/details'
  app.get(
    '/user/:userId',
    getEnrolledCourseByUserSchema,
    CourseController.getEnrolledCourseByUser
  ); // get course by user id Route: GET '/private/course/user/:userId'
}

//   question :  why schema adding in route file ?
//   answer :  because we want to validate the request body before it reaches the controller
//   question :  why not adding in controller file ?
//   answer :  because we want to validate the request body before it reaches the controller
