import { CustomError } from '../utils/error.utils';

/**
 * Creates a new instance of CustomError with the provided details.
 * 
 * @param name - The name of the error.
 * @param statusCode - The HTTP status code associated with the error.
 * @param message - The error message.
 * @param data - Optional additional data related to the error.
 * @returns A new instance of CustomError.
 */
export default function createError(
  name: string,
  statusCode: number,
  message: string,
  data: any = null
) {
  // Create a new CustomError instance with the specified parameters
  return new CustomError(name, message, statusCode, data);
}
