import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db_user",
  password: "root",
  port: 5432,
});
