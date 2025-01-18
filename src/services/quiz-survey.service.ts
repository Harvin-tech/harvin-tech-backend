// src/services/authService.ts

import { createError } from '../hooks';
import { QuizSurvey as QuizSurveyModel, User as UserModel } from '../models';
import { postQuizSurvey_I } from '../types/quiz-servey.type';

export class QuizSurveyService {
  static async postQuizSurvey(data: postQuizSurvey_I): Promise<any> {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: data.email });

    // const existingSurvey = await QuizSurveyModel.findOne({
    //   email: data.email,
    //   status: 1,
    // });

    // if (existingSurvey) {
    //   return {
    //     user: {
    //       ...existingSurvey['_doc'],
    //     },
    //     created: false,
    //   };
    // }

    const user = new QuizSurveyModel({
      ...data,
      exsistingUser: existingUser ? true : false,
    });

    await user.save();

    const { ...restData } = user['_doc'];

    const response = {
      user: {
        ...restData,
      },
      created: true,
    };

    return response;
  }
}
