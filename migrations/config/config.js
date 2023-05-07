// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_MIGRATION_USER,
    password: process.env.DB_MIGRATION_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    "logging":true,
  },
  test: {
    username: process.env.DB_MIGRATION_USER,
    password: process.env.DB_MIGRATION_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_MIGRATION_USER,
    password: process.env.DB_MIGRATION_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};
