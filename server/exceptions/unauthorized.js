export class UnAuthorizedException extends Error {
  constructor(message,statusCode) {
    super(message);
    this.isException = true;
    this.statusCode = statusCode || 401;
  }
};