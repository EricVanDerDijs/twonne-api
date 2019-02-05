const { e, DEFAULT_ERROR } = require('../utils/constants')

module.exports = errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const error = e[err.message] || DEFAULT_ERROR;
  
  console.error(err.message);
  console.error(error);
  console.error(err);

  res
    .status(error.httpCode)
    .json({
      error: {
        id: err.message,
        code: error.code,
        description: error.description
      }
    })
}