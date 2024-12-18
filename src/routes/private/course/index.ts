import { FastifyInstance } from "fastify";
import { CourseController } from "../../../controllers/course.controller";
import { addCourseSchema } from "../../../schema/course.schema";

export default async function addCourseRoute(app: FastifyInstance) {
    app.post('/addCourse', addCourseSchema, CourseController.addCourse);
  }

//   question :  why schema adding in route file ?
//   answer :  because we want to validate the request body before it reaches the controller
//   question :  why not adding in controller file ?
//   answer :  because we want to validate the request body before it reaches the controller
