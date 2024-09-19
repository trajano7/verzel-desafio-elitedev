export class CustomError extends Error {
  constructor(message, status, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
