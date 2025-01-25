import { FastifyInstance } from 'fastify';
import { CourseController } from '../../../controllers/course.controller';
import {
  addCourseSchema,
  getCourseBySlugSchema,
  getCourseSchema,
} from '../../../schema/course.schema';

export default async function addCourseRoute(app: FastifyInstance) {
  app.get('/', getCourseSchema, CourseController.getCourse); // get all course Route: GET '/public/course'
  app.get('/:slug', getCourseBySlugSchema, CourseController.getCourseBySlug); // get course by id Route: GET '/private/course/:courseId'
  // app.post('/', addCourseSchema, CourseController.addCourse); // add course Route: POST '/private/course'
}
//   question :  why schema adding in route file ?
//   answer :  because we want to validate the request body before it reaches the controller
//   question :  why not adding in controller file ?
//   answer :  because we want to validate the request body before it reaches the controller
