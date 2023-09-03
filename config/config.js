require("dotenv").config();
const env = process.env;

const development = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  dialect: env.DIALECT,
  host: env.HOST,
};

module.exports = development;
