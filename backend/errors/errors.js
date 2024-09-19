class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotAuthError";
    this.status = 401;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}


exports.NotAuthError = NotAuthError;
exports.NotFoundError = NotFoundError;