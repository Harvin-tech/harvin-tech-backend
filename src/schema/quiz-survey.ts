import { Schema } from '../types/schema.type';

export const postQuizSurveySchema: Schema = {
  schema: {
    tags: ['Quiz Survey'], // Categorized as Courses
    body: {
      type: 'object',
      required: ['name', 'email', 'selectedProgram', 'goal', 'track'],
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'The email of the user',
        },
        mobile: {
          type: ['number', 'null'],
        },
        selectedProgram: {
          type: 'string',
        },
        goal: {
          type: 'string',
        },
        track: {
          type: 'string',
        },
      },
      additionalProperties: false, // Disallow unexpected fields
    },
  },
};
