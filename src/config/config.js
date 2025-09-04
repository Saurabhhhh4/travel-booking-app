require("dotenv").config();
const common = {
  define: { underscored: true, freezeTableName: true, timestamps: true },
  logging: false,
};
module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "travel_db",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    dialect: process.env.DB_DIALECT || "mysql",
    ...common,
  },
  test: {
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: process.env.DB_STORAGE || ":memory:",
    ...common,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    ...common,
  },
};
