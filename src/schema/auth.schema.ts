import { Schema } from '../types/schema.type';

export const registerSchema: Schema = {
  schema: {
    tags: ['Auth'], // Categorized as Auth
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          description: 'The email of the user',
        },
        password: {
          type: 'string',

          description: 'The user password, required for email login',
        },
        firstName: {
          type: ['string', 'null'],
          description: 'The first name of the user',
        },
        middleName: {
          type: ['string', 'null'],

          description: 'The middle name of the user',
        },
        lastName: {
          type: ['string', 'null'],

          description: 'The last name of the user',
        },
        dob: {
          type: ['string', 'null'],
          format: 'date',

          description: 'The date of birth of the user (ISO format)',
        },
        mobile: {
          type: ['integer', 'null'],

          description: 'The mobile number of the user',
        },
        photo: {
          type: ['string', 'null'],

          description: 'The profile photo URL of the user',
        },
        gender: {
          type: ['integer', 'null'],
          enum: [1, 2, 3, 4], // 1 = male, 2 = female, etc.

          description: 'The gender of the user',
        },
        address: {
          type: ['string', 'null'],
          description: 'The address of the user',
        },
      },
      additionalProperties: false,
      required: ['email', 'password'],
    },
  },
};

export const loginSchema: Schema = {
  schema: {
    tags: ['Auth'], // Categorized as Auth
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

export const logoutSchema: Schema = {
  schema: {
    tags: ['Auth'], // Categorized as Auth
  },
};
