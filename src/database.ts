import { Pool } from "pg";

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'root',
  port: 5432
});

