const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./utils/logger");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/error");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
);
app.use("/api", routes);
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use(notFound);
app.use(errorHandler);

module.exports = app;
