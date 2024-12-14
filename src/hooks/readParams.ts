import { FastifyRequest } from "fastify"

/**
 * Reads the URL parameters from the Fastify request object and
 * returns them as the specified type T.
 *
 * @template T - The expected type of the request parameters.
 * @param {FastifyRequest} request - The Fastify request object.
 * @returns {T} - The request parameters cast to type T.
 */
export default function readParams<T>(request: FastifyRequest): T {
  return request.params as T
}
