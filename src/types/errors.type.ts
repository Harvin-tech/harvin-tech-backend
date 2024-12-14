export enum BAD_REQUEST {
  name = 'BAD_REQUEST',
  message = 'The request could not be understood or was missing required parameters.',
  status = 400,
}

export enum UNAUTHORIZED {
  name = 'UNAUTHORIZED',
  message = 'Access is denied due to invalid credentials.',
  status = 401,
}

export enum FORBIDDEN {
  name = 'FORBIDDEN',
  message = 'You do not have permission to access this resource.',
  status = 403,
}

export enum NOT_FOUND {
  name = 'NOT_FOUND',
  message = 'The requested resource could not be found.',
  status = 404,
}

export enum METHOD_NOT_ALLOWED {
  name = 'METHOD_NOT_ALLOWED',
  message = 'The HTTP method is not allowed for this endpoint.',
  status = 405,
}

export enum NOT_ACCEPTABLE {
  name = 'NOT_ACCEPTABLE',
  message = 'The request cannot be accepted due to its format or content.',
  status = 406,
}

export enum PROXY_AUTHENTICATION_REQUIRED {
  name = 'PROXY_AUTHENTICATION_REQUIRED',
  message = 'Authentication is required to access the proxy server.',
  status = 407,
}

export enum REQUEST_TIMEOUT {
  name = 'REQUEST_TIMEOUT',
  message = 'The server timed out waiting for the request.',
  status = 408,
}

export enum CONFLICT {
  name = 'CONFLICT',
  message = 'The request conflicts with the current state of the server.',
  status = 409,
}

export enum GONE {
  name = 'GONE',
  message = 'The requested resource is no longer available.',
  status = 410,
}

export enum LENGTH_REQUIRED {
  name = 'LENGTH_REQUIRED',
  message = 'The request did not specify the length of its content.',
  status = 411,
}

export enum PRECONDITION_FAILED {
  name = 'PRECONDITION_FAILED',
  message = 'One or more conditions in the request header fields evaluated to false.',
  status = 412,
}

export enum PAYLOAD_TOO_LARGE {
  name = 'PAYLOAD_TOO_LARGE',
  message = 'The request payload is too large for the server to process.',
  status = 413,
}

export enum URI_TOO_LONG {
  name = 'URI_TOO_LONG',
  message = 'The request URI is too long for the server to process.',
  status = 414,
}

export enum UNSUPPORTED_MEDIA_TYPE {
  name = 'UNSUPPORTED_MEDIA_TYPE',
  message = 'The request media type is not supported by the server.',
  status = 415,
}

export enum RANGE_NOT_SATISFIABLE {
  name = 'RANGE_NOT_SATISFIABLE',
  message = 'The range specified in the request cannot be fulfilled.',
  status = 416,
}

export enum EXPECTATION_FAILED {
  name = 'EXPECTATION_FAILED',
  message = 'The server could not meet the expectation specified in the request header.',
  status = 417,
}

export enum INTERNAL_SERVER_ERROR {
  name = 'INTERNAL_SERVER_ERROR',
  message = 'An unexpected server error occurred.',
  status = 500,
}

export enum BAD_GATEWAY {
  name = 'BAD_GATEWAY',
  message = 'The server received an invalid response from an upstream server.',
  status = 502,
}

export enum SERVICE_UNAVAILABLE {
  name = 'SERVICE_UNAVAILABLE',
  message = 'The server is currently unavailable due to maintenance or overloading.',
  status = 503,
}

export enum INSUFFICIENT_STORAGE {
  name = 'INSUFFICIENT_STORAGE',
  message = 'The server does not have enough storage to complete the request.',
  status = 507,
}

export enum NETWORK_AUTHENTICATION_REQUIRED {
  name = 'NETWORK_AUTHENTICATION_REQUIRED',
  message = 'Authentication is required to access the network.',
  status = 511,
}

export interface error {
  name: string;
  message: string;
}
