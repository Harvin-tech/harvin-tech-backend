import { FastifyInstance } from 'fastify';
import { postQuizSurveySchema } from '../../../schema/quiz-survey';
import { QuizSurveyController } from '../../../controllers/quiz-survey';

export default async function addCourseRoute(app: FastifyInstance) {
  app.post('/', postQuizSurveySchema, QuizSurveyController.postQuizSurvey); // get all course Route: GET '/public/quiz-survey'
}

//   question :  why schema adding in route file ?
//   answer :  because we want to validate the request body before it reaches the controller
//   question :  why not adding in controller file ?
//   answer :  because we want to validate the request body before it reaches the controller
