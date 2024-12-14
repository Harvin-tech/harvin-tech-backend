import { FastifyReply } from 'fastify';

/**
 * Sends a structured HTTP response using Fastify.
 *
 * @param reply - The Fastify reply object used to send the response.
 * @param status - The HTTP status code for the response.
 * @param message - A message describing the result of the request.
 * @param data - Optional data to include in the response body (default is an empty object).
 */
export default function sendResponse(
  reply: FastifyReply,
  status: number,
  message: string,
  data: any = {}
) {
  // Set the status code and send the response with the provided message and data
  return reply.status(status).send({
    status,
    message,
    data,
  });
}
