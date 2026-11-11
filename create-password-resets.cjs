require("dotenv").config({ path: ".env.local" });
const mysql = require("mysql2/promise");

async function main() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  await db.execute(`
    CREATE TABLE IF NOT EXISTS password_resets (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL,
      code_hash CHAR(64) NOT NULL,
      expires_at DATETIME NOT NULL,
      verified_at DATETIME NULL DEFAULT NULL,
      PRIMARY KEY (id),
      KEY idx_password_resets_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  console.log("SUCCESS: password_resets table is ready.");
  await db.end();
}

main().catch((err) => {
  console.error("Database setup failed:", err.code || err.message);
  process.exitCode = 1;
});
