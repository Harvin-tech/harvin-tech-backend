import path from 'path';
import Fastify, { FastifyInstance } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import autoload from '@fastify/autoload';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { globalErrorHandler } from './utils/error.utils';
import { generateSwaggerApiDocs } from './utils/swagger-docs';
import cookiePlugin from './plugin/cookie.plugin';
import { AuthMiddleware } from './middleware/auth.middleware';

const app = Fastify<Server, IncomingMessage, ServerResponse>({
  logger: false,
});

const appService = (app: FastifyInstance) => {
  generateSwaggerApiDocs(app);

  let allowed_origins: string[] = [];
  allowed_origins = String(process.env.ALLOWED_ORIGINS || '').split(',');
  console.log(allowed_origins);

  app.register(fastifyCors, {
    origin: allowed_origins,
    credentials: true,
  });

  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1024 * 1024 * 10, // For multipart forms, the max file size in bytes i.e. 10 MB right now
    },
    throwFileSizeLimit: true,
  });

  // autoload all routers
  app.register(autoload, {
    dir: path.join(__dirname, 'routes'),
    options: {
      prefix: '/',
    },
  });

  // Register cookie plugin
  app.register(cookiePlugin);

  // Register authentication middleware
  app.addHook('preHandler', AuthMiddleware.authenticate);

  globalErrorHandler(app);
};

app.register(appService);

export default app;
