import { Schema } from '../types/schema.type';

export const registerSchema: Schema = {
  schema: {
    tags: ['Public'], // Categorized as Public
    body: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        middleName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        dob: {
          type: 'string',
        },
        mobile: {
          type: 'number',
        },
        photo: {
          type: 'string',
        },
        gender: {
          type: 'number',
        },
        address: {
          type: 'string',
        },
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

export const loginSchema: Schema = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
      },
    },
  },
};
