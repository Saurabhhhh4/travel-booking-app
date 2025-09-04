require("dotenv").config();
const app = require("./app");
const logger = require("./utils/logger");
const { sequelize } = require("./db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    logger.info("DB connected");
    app.listen(PORT, () => logger.info(`Server listening on ${PORT}`));
  } catch (err) {
    logger.error("Startup failed", err);
    process.exit(1);
  }
})();
