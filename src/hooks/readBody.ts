import { FastifyRequest } from 'fastify';

/**
 * Extracts and returns the body of the request as the specified type T.
 *
 * @template T - The expected type of the request body.
 * @param {FastifyRequest} request - The Fastify request object.
 * @returns {T} - The request body cast to type T.
 */
export default function readBody<T>(request: FastifyRequest): T {
  return request.body as T;
}
