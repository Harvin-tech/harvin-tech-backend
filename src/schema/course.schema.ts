import { Schema } from '../types/schema.type';

export const addCourseSchema: Schema = {
  schema: {
    tags: ['Courses'], // Categorized as Courses
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'The title of the course',
        },
        subTitle: {
          type: ['string', 'null'],
          description: 'The subtitle of the course',
        },
        image: {
          type: ['string', 'null'],
          description: 'The URL of the course image',
        },
        category: {
          type: 'string',
          description: 'The category of the course',
        },
        instructor: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$', // MongoDB ObjectId pattern (24 hex characters)
          description: 'The ID of the instructor (user reference)',
        },
        price: {
          type: 'number',
          description: 'The price of the course',
        },
        level: {
          type: 'string',
          enum: ['beginner', 'intermediate', 'advanced'],
          description: 'The difficulty level of the course',
        },
        mrp: {
          type: 'number',
          description: 'The maximum retail price of the course',
        },
        description: {
          type: 'string',
          description: 'A detailed description of the course',
        },
        status: {
          type: 'integer',
          enum: [0, 1, -1], // 0 = inactive, 1 = active, -1 = deleted
          description: 'The status of the course',
        },
      },
      required: ['title', 'category', 'description'], // Fields required for creating or updating a course
      additionalProperties: false, // Disallow unexpected fields
    },
  },
};

export const getCourseSchema: Schema = {
  schema: {
    tags: ['Courses'], // Categorized as Courses
    query: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
          description:
            'Search keyword to match title or category (case-insensitive)',
        },
        status: {
          type: 'integer',
          enum: [0, 1, -1], // 0 = inactive, 1 = active, -1 = deleted
          description: 'Filter courses by status',
        },
        category: {
          type: 'string',
          description: 'Filter courses by category',
        },
        minPrice: {
          type: 'number',
          description: 'The price of the course',
        },
        maxPrice: {
          type: 'number',
          description: 'The price of the course',
        },
        level: {
          type: 'string',
          enum: ['beginner', 'intermediate', 'advanced'],
          description: 'The difficulty level of the course',
        },
        page: {
          type: 'integer',
          minimum: 1,
          description: 'The page number for pagination (default: 1)',
        },
        limit: {
          type: 'integer',
          minimum: 1,
          description: 'The number of items per page (default: 10)',
        },
      },
      additionalProperties: false, // Disallow unexpected query parameters
    },
  },
};

export const updateCourseSchema: Schema = {
  schema: {
    tags: ['Courses'], // Categorized as Courses
    params: {
      type: 'object',
      properties: {
        courseId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$', // MongoDB ObjectId pattern (24 hex characters)
          description: 'The ID of the course to update',
        },
      },
      required: ['courseId'], // Fields required for updating a course
    },
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'The title of the course',
        },
        subTitle: {
          type: ['string', 'null'],
          description: 'The subtitle of the course',
        },
        image: {
          type: ['string', 'null'],
          description: 'The URL of the course image',
        },
        category: {
          type: 'string',
          description: 'The category of the course',
        },
        instructor: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$', // MongoDB ObjectId pattern (24 hex characters)
          description: 'The ID of the instructor (user reference)',
        },
        price: {
          type: 'number',
          description: 'The price of the course',
        },
        level: {
          type: 'string',
          enum: ['beginner', 'intermediate', 'advanced'],
          description: 'The difficulty level of the course',
        },
        mrp: {
          type: 'number',
          description: 'The maximum retail price of the course',
        },
        description: {
          type: 'string',
          description: 'A detailed description of the course',
        },
        status: {
          type: 'integer',
          enum: [0, 1, -1], // 0 = inactive, 1 = active, -1 = deleted
          description: 'The status of the course',
        },
      },
      required: ['title', 'category', 'description'], // Fields required for creating or updating a course
      additionalProperties: false, // Disallow unexpected fields
    },
  },
};
