
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
  } catch (error: unknown) {
    const err = error as { code?: string; errno?: number };

    console.error("DB_CHECK_ERROR:", {
      code: err.code,
      errno: err.errno,
    });

    return NextResponse.json(
      {
        ok: false,
        errorCode: err.code || "UNKNOWN_ERROR",
        errorNumber: err.errno || null,
      },
      { status: 500 }
    );
  }
}
