class HttpError extends Error {
  constructor(status, message, errors = null) {
    super(message);
    this.status = status;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotAuthError extends HttpError {
  constructor(message = "Not authenticated.") {
    super(401, message);
    this.name = "NotAuthError";
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    super(404, message);
    this.name = "NotFoundError";
    Error.captureStackTrace(this, this.constructor);
  }
}


exports.NotAuthError = NotAuthError;
exports.NotFoundError = NotFoundError;
exports.HttpError = HttpError;