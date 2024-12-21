import { Schema } from '../types/schema.type';

export const addCourseSchema: Schema = {
  schema: {
    tags: ['Courses'], // Categorized as Courses
    body: {
      type: 'object',
      required: ['title', 'category', 'description', 'chapters'],
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
        chapters: {
          type: 'array',
          description: 'List of chapters in the course',
          minItems: 1,
          items: {
            type: 'object',
            required: ['title', 'lessons'],
            properties: {
              title: {
                type: 'string',
                description: 'Title of the chapter',
                minLength: 1,
              },
              description: {
                type: 'string',
                description: 'Description of the chapter (optional)',
              },
              lessons: {
                type: 'array',
                description: 'List of lessons in the chapter',
                minItems: 1,
                items: {
                  type: 'object',
                  required: ['title', 'type'],
                  properties: {
                    title: {
                      type: 'string',
                      description: 'Title of the lesson',
                      minLength: 1,
                    },
                    content: {
                      type: 'string',
                      description: 'Content of the lesson (optional)',
                    },
                    video: {
                      type: 'string',
                      format: 'uri',
                      description:
                        'URL of the video (if the lesson includes a video)',
                    },
                    duration: {
                      type: 'number',
                      description: 'Duration of the lesson in seconds',
                    },
                    type: {
                      type: 'string',
                      enum: [
                        'video',
                        'content',
                        'quiz',
                        'assignment',
                        'discussion',
                        'test',
                      ],
                      description: 'Type of the lesson',
                    },
                  },
                  additionalProperties: false,
                },
              },
            },
            additionalProperties: false,
          },
        },
      },
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

export const getCourseByIDSchema: Schema = {
  schema: {
    tags: ['Courses'], // Categorized as Courses
    params: {
      type: 'object',
      properties: {
        courseId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$', // MongoDB ObjectId pattern (24 hex characters)
          description: 'The ID of the course to retrieve',
        },
      },
      required: ['courseId'], // Fields required for getting a course by ID
    },
    query: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          enum: [0, 1, -1], // 0 = inactive, 1 = active, -1 = deleted
          description: 'Filter courses by status',
        },
      },
      additionalProperties: false, // Disallow unexpected query parameters
    },
  },
};

export const getChapterByIDSchema: Schema = {
  schema: {
    tags: ['Courses'], // Categorized as Courses
    params: {
      type: 'object',
      properties: {
        chapterId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$', // MongoDB ObjectId pattern (24 hex characters)
          description: 'The ID of the course to retrieve',
        },
      },
      required: ['chapterId'], // Fields required for getting a course by ID
    },
    query: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          enum: [0, 1, -1], // 0 = inactive, 1 = active, -1 = deleted
          description: 'Filter courses by status',
        },
      },
      additionalProperties: false, // Disallow unexpected query parameters
    },
  },
};

export const getLessonByIDSchema: Schema = {
  schema: {
    tags: ['Courses'], // Categorized as Courses
    params: {
      type: 'object',
      properties: {
        lessonId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$', // MongoDB ObjectId pattern (24 hex characters)
          description: 'The ID of the course to retrieve',
        },
      },
      required: ['lessonId'], // Fields required for getting a course by ID
    },
    query: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          enum: [0, 1, -1], // 0 = inactive, 1 = active, -1 = deleted
          description: 'Filter courses by status',
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

export const enrollCourseSchema: Schema = {
  schema: {
    tags: ['Courses'], // Categorized as Courses
    body: {
      type: 'object',
      required: ['courseId', 'userId'],
      properties: {
        courseId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$', // MongoDB ObjectId pattern (24 hex characters)
          description: 'The ID of the course to enroll',
        },
        userId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$', // MongoDB ObjectId pattern (24 hex characters)
          description: 'The ID of the user to enroll',
        },
      },
      additionalProperties: false, // Disallow unexpected fields
    },
  },
};

export const getEnrolledCourseByUserSchema: Schema = {
  schema: {
    tags: ['Courses'], // Categorized as Courses
    params: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$', // MongoDB ObjectId pattern (24 hex characters)
          description: 'The ID of the user to retrieve enrolled courses',
        },
      },
      required: ['userId'], // Fields required for getting enrolled courses by user
    },
    query: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
          description:
            'Search keyword to match title or category (case-insensitive)',
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
        status: {
          type: 'integer',
          enum: [0, 1, -1], // 0 = inactive, 1 = active, -1 = deleted
          description: 'Filter courses by status',
        },
      },
      additionalProperties: false, // Disallow unexpected query parameters
    },
  },
};
