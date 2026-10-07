import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body?.email || "")
      .trim()
      .toLowerCase();

    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and new password are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const db = getDb();

    // Get the latest verified reset request.
    const [rows] = await db.execute(
      `SELECT id, email, expires_at, verified_at
       FROM password_resets
       WHERE email = ?
         AND verified_at IS NOT NULL
       ORDER BY id DESC
       LIMIT 1`,
      [email]
    );

    const resets = rows as Array<{
      id: number;
      email: string;
      expires_at: Date | string;
      verified_at: Date | string | null;
    }>;

    if (resets.length === 0) {
      return NextResponse.json(
        {
          message: "Please complete verification first.",
        },
        { status: 400 }
      );
    }

    const reset = resets[0];

    // Check expiry using the same UTC clock used during verification.
    const [timeRows] = await db.execute(
      "SELECT UTC_TIMESTAMP() AS current_utc"
    );

    const currentTime = (timeRows as Array<{
      current_utc: Date | string;
    }>)[0]?.current_utc;

    const currentUtc = new Date(currentTime);
    const expiryTime = new Date(reset.expires_at);

    if (
      Number.isNaN(expiryTime.getTime()) ||
      Number.isNaN(currentUtc.getTime()) ||
      expiryTime.getTime() <= currentUtc.getTime()
    ) {
      return NextResponse.json(
        {
          message:
            "Your verification has expired. Please request a new code.",
        },
        { status: 400 }
      );
    }

    // Hash the new password.
    const passwordHash = await bcrypt.hash(password, 10);

    // Update the user's password.
    const [result] = await db.execute(
      "UPDATE users SET password_hash = ? WHERE email = ?",
      [passwordHash, email]
    );

    const updateResult = result as {
      affectedRows?: number;
    };

    if (!updateResult.affectedRows) {
      return NextResponse.json(
        {
          message: "Account not found.",
        },
        { status: 404 }
      );
    }

    // Delete the reset request after successful password change.
    await db.execute(
      "DELETE FROM password_resets WHERE id = ?",
      [reset.id]
    );

    return NextResponse.json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Password reset error:", error);

    return NextResponse.json(
      {
        message: "Database error. Please check your MySQL connection.",
      },
      { status: 500 }
    );
  }
}