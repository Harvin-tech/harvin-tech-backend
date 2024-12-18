import { Schema } from "../types/schema.type";

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
          format: 'objectId', // Assumes ObjectId format for MongoDB
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
          enum: [0, 1, -1], // 0 = draft, 1 = published, -1 = archived
          description: 'The status of the course',
        },
      },
      required: ['title', 'category', 'description'], // Fields required for creating or updating a course
      additionalProperties: false, // Disallow unexpected fields
    },
  },
};
