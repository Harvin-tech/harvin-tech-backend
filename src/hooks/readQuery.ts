import { FastifyRequest } from 'fastify';

/**
 * Extracts the query parameters from the request and returns them as
 * the specified type T.
 *
 * @template T - The expected type of the query parameters.
 * @param {FastifyRequest} request - The Fastify request object.
 * @returns {T} - The query parameters as the specified type T.
 */
export default function readQuery<T>(request: FastifyRequest): T {
  return request.query as T;
}
