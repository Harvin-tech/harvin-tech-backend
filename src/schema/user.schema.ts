import { Schema } from '../types/schema.type';

export const PostUserSchema: Schema = {
  schema: {
    tags: ['Public'], // Categorized as Public
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
      additionalProperties: false,
      required: ['email', 'password'],
    },
  },
};

