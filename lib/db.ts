
import mysql from "mysql2/promise";

const cleanEnv = (value: string | undefined) =>
  value?.trim();

export const pool = mysql.createPool({
  host: cleanEnv(process.env.DB_HOST),
  port: Number(cleanEnv(process.env.DB_PORT) || 3306),
  user: cleanEnv(process.env.DB_USER),
  password: process.env.DB_PASSWORD,
  database: cleanEnv(process.env.DB_NAME),
  waitForConnections: true,
  connectionLimit: 10,
  charset: "utf8mb4",
  ssl: {
    rejectUnauthorized: false,
  },
});

export function getDb() {
  return pool;
}
