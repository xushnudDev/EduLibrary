export class UnAuthorizedException extends BaseException {
  constructor(message) {
    super(message);
    this.isException = true;
    this.statusCode = statusCode || 401;
  }
};