import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export const generateSwaggerApiDocs = (app: FastifyInstance) => {
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'API Documentation',
        description: 'API documentation for infyrel application',
        version: '1.0.0',
      },
      host: `localhost:${process.env.PORT || 8082}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'Public', description: 'Public APIs' },
        { name: 'Private', description: 'Private APIs' },
      ],
    },
  });

  // Register Swagger UI Plugin
  app.register(fastifySwaggerUi, {
    routePrefix: '/api-docs', // Swagger documentation route
    uiConfig: {
      docExpansion: 'list', // Expand all sections by default
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
};
