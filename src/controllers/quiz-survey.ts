import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/user.service';
import {
  createError,
  readBody,
  readParams,
  readQuery,
  sendResponse,
} from '../hooks';
import { QuizSurveyService } from '../services/quiz-survey.service';
import { postQuizSurvey_I } from '../types/quiz-servey.type';

export class QuizSurveyController {
  static async postQuizSurvey(request: FastifyRequest, reply: FastifyReply) {
    try {
      const requestBody = readBody<postQuizSurvey_I>(request);

      const user = await QuizSurveyService.postQuizSurvey(requestBody);

      return sendResponse(
        reply,
        201,
        user.created
          ? 'Your quiz submitted successfully'
          : 'Your quiz already submitted',
        user
      );
    } catch (error) {
      throw error;
    }
  }
}
