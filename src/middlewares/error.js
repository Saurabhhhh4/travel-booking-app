const logger = require("../utils/logger");

function notFound(req, res) {
  res.status(404).json({ error: "Not Found" });
}

function errorHandler(err, req, res, next) {
  logger.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
}

module.exports = { notFound, errorHandler };
