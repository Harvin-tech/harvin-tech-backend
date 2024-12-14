import { FastifyRequest } from 'fastify';

/**
 * Extracts and returns the files from the Fastify request object as the specified type T.
 *
 * @template T - The expected type of the request files.
 * @param {FastifyRequest} request - The Fastify request object.
 * @returns {T} - The request files cast to type T.
 */
export default function readFiles<T>(request: FastifyRequest): T {
  const files: any = request.files; // Extract files from the request
  return files as T; // Cast files to the specified type T
}
