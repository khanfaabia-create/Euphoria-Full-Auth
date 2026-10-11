
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    try {
      await connection.query("SELECT 1");
      await connection.query("SELECT id FROM users LIMIT 1");

      return NextResponse.json({
        ok: true,
        database: "connected",
        usersTable: "available",
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("DB_CHECK_ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Database connection or users table check failed.",
      },
      { status: 500 }
    );
  }
}
