import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from '../types/errors.type';
import { createError } from '../hooks';
import { ENV } from '../config/env';

export class CustomError extends Error {
  name: string;
  statusCode: number;
  data: any;

  constructor(
    name: string,
    message: string,
    statusCode: number,
    data: any = null
  ) {
    super(message);

    // assign the error class name in your custom error (as a shortcut)
    this.name = name;
    // assign error status code
    this.statusCode = statusCode;

    // capturing the stack trace keeps the reference to your error class
    if (ENV.NODE_ENV !== 'production')
      Error.captureStackTrace(this, this.constructor);

    // Exrta data
    this.data = data;
  }
}

export const globalErrorHandler = (app: FastifyInstance) => {
  app.setNotFoundHandler(() => {
    throw createError(NOT_FOUND.name, NOT_FOUND.status, NOT_FOUND.message);
  });

  app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
    console.error('ERROR_CATCH_HANDLER', error);

    // Handle CustomError
    if (error instanceof CustomError) {
      console.error('ERROR_CATCH_CUSTOM_ERROR');
      return reply.status(error.statusCode).send({
        error: true,
        status: error.statusCode,
        name: error.name,
        message: error.message,
        data: error.data || null,
      });
    }

    // Handle Fastify errors
    if (error.statusCode) {
      console.error('ERROR_CATCH_STATUS_CODE_ERROR');
      return reply.status(error.statusCode || BAD_REQUEST.status).send({
        error: true,
        status: error.statusCode || BAD_REQUEST.status,
        name: error.code || BAD_REQUEST.name,
        message: error.message || BAD_REQUEST.message,
        data: error.validation || null,
      });
    }

    // // Handle unknown errors (fallback)
    return reply.status(error.statusCode || INTERNAL_SERVER_ERROR.status).send({
      error: true,
      status: error.statusCode || INTERNAL_SERVER_ERROR.status,
      name: error.code || INTERNAL_SERVER_ERROR.name,
      message: error.message || INTERNAL_SERVER_ERROR.message,
      data: null,
    });
  });
};
