import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/lib/db";

function sha(value: string) {
  return crypto
    .createHash("sha256")
    .update(value, "utf8")
    .digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body?.email || "")
      .trim()
      .toLowerCase();

    const code = String(body?.code || "")
      .trim();

    if (!email || !code) {
      return NextResponse.json(
        {
          message: "Email and verification code are required.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        {
          message: "Verification code must be 6 digits.",
        },
        { status: 400 }
      );
    }

    const db = getDb();

    // Get the newest reset request.
    const [rows] = await db.execute(
      `SELECT id, email, code_hash, expires_at, verified_at
       FROM password_resets
       WHERE email = ?
       ORDER BY id DESC
       LIMIT 1`,
      [email]
    );

    const resets = rows as Array<{
      id: number;
      email: string;
      code_hash: string;
      expires_at: Date | string;
      verified_at: Date | string | null;
    }>;

    if (resets.length === 0) {
      return NextResponse.json(
        {
          message: "No verification request found.",
        },
        { status: 400 }
      );
    }

    const reset = resets[0];

    // Check expiry directly using MySQL UTC time.
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
          message: "Invalid or expired verification code.",
        },
        { status: 400 }
      );
    }

    // Check the entered code.
    const enteredHash = sha(code);
    const storedHash = String(reset.code_hash || "").trim();

    if (
      !storedHash ||
      enteredHash.length !== storedHash.length ||
      !crypto.timingSafeEqual(
        Buffer.from(enteredHash, "utf8"),
        Buffer.from(storedHash, "utf8")
      )
    ) {
      return NextResponse.json(
        {
          message: "Invalid or expired verification code.",
        },
        { status: 400 }
      );
    }

    // Mark the exact reset request as verified.
    const [updateResult] = await db.execute(
      `UPDATE password_resets
       SET verified_at = UTC_TIMESTAMP()
       WHERE id = ?`,
      [reset.id]
    );

    const result = updateResult as {
      affectedRows?: number;
    };

    if (!result.affectedRows) {
      return NextResponse.json(
        {
          message: "Verification could not be saved.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Verified successfully.",
      resetId: reset.id,
    });
  } catch (error) {
    console.error("Password verify error:", error);

    return NextResponse.json(
      {
        message: "Database error. Please check your MySQL connection.",
      },
      { status: 500 }
    );
  }
}