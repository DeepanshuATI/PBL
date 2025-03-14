const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    error: err.stack || null,
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Not Found - ${req.originalUrl}`,
    error: null,
  });
};

export { errorHandler, notFoundHandler };
