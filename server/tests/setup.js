const dotenv = require("dotenv");

dotenv.config({
  path: ".env.test",
  override: true,
});

const pool = require("../db");

afterAll(async () => {
  await pool.end();
});