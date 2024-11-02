const { HttpError } = require("../errors/errors");

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
      ...(err.errors ? { errors: err.errors } : {}),
    });
  }
  res
    .status(500)
    .json({ message: "Algo deu errado. Tente novamente mais tarde." });
}

module.exports = {
  errorHandler,
};
