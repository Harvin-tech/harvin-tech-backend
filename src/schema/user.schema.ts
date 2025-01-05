import { Schema } from '../types/schema.type';

export const getUserSchema: Schema = {
  schema: {
    tags: ['Users'], // Categorized as Auth
    query: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
          description:
            'Search keyword to match email or first name (case-insensitive)',
        },
        status: {
          type: 'integer',
          enum: [0, 1, 2], // 0 = inactive, 1 = active, 2 = deleted
          description: 'Filter users by status',
        },
        type: {
          type: 'string',
          enum: ['student', 'admin', 'teacher', 'super-admin'],
          description: 'Filter users by role',
        },
        page: {
          type: 'integer',
          minimum: 1,
          description: 'The page number for pagination (default: 1)',
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 100,
          description: 'Number of users per page (default: 10, max: 100)',
        },
      },
      required: [],
      additionalProperties: false, // Disallow unexpected query params
    },
  },
};

export const getUserByIDSchema: Schema = {
  schema: {
    tags: ['Users'], // Categorized as Auth
    params: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'The user ID',
        },
      },
      required: ['userId'],
      additionalProperties: false, // Disallow unexpected params
    },
  },
};

export const updateUserSchema: Schema = {
  schema: {
    tags: ['Users'], // Categorized as Auth
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          description: 'The email of the user',
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
        role: {
          type: 'string',
          enum: ['student', 'admin', 'teacher', 'super-admin'],

          description: 'The role of the user',
        },
        status: {
          type: 'integer',
          enum: [0, 1, 2], // 0 = inactive, 1 = active, 2 = deleted
          description: 'The status of the user',
        },
      },
      required: [],
      additionalProperties: false, // Disallow unexpected fields
    },
  },
};

export const changePasswordSchema: Schema = {
  schema: {
    tags: ['Users'], // Categorized as Auth
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          description: 'The email of the user',
        },
        oldPassword: {
          type: 'string',
          minLength: 6,
          description: 'The old password of the user',
        },
        newPassword: {
          type: 'string',
          minLength: 6,
          description: 'The new password of the user',
        },
      },
      required: ['email', 'oldPassword', 'newPassword'],
      additionalProperties: false, // Disallow unexpected fields
    },
  },
};
