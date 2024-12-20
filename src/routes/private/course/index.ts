import { FastifyInstance } from 'fastify';
import { CourseController } from '../../../controllers/course.controller';
import {
  addCourseSchema,
  getCourseSchema,
  updateCourseSchema,
} from '../../../schema/course.schema';

export default async function addCourseRoute(app: FastifyInstance) {
  app.get('/', getCourseSchema, CourseController.getCourse);
  app.post('/', addCourseSchema, CourseController.addCourse);
  app.patch('/:courseId', updateCourseSchema, CourseController.updateCourse);
  app.get('/:courseId', {}, CourseController.getCourseById);
}

//   question :  why schema adding in route file ?
//   answer :  because we want to validate the request body before it reaches the controller
//   question :  why not adding in controller file ?
//   answer :  because we want to validate the request body before it reaches the controller
