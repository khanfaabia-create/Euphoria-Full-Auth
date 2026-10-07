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

    if (!email) {
      return NextResponse.json(
        {
          message: "Email address is required.",
        },
        { status: 400 }
      );
    }

    const db = getDb();

    // Check whether the account exists.
    const [rows] = await db.execute(
      "SELECT id, email FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const users = rows as Array<{
      id: number;
      email: string;
    }>;

    if (users.length === 0) {
      return NextResponse.json(
        {
          message: "No account found with this email.",
        },
        { status: 404 }
      );
    }

    // Generate a fresh 6-digit verification code.
    const code = crypto.randomInt(100000, 1000000).toString();

    const codeHash = sha(code);

    // Keep the code valid for 30 minutes.
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // Delete any previous reset request for this email.
    await db.execute(
      "DELETE FROM `password-resets` WHERE email = ?",
      [email]
    );

    // Save the new reset request.
    await db.execute(
      `INSERT INTO \`password-resets\`
       (email, code_hash, expires_at, verified_at)
       VALUES (?, ?, ?, NULL)`,
      [email, codeHash, expiresAt]
    );

    return NextResponse.json({
      message: "Verification code generated.",
      devCode: code,
    });
  } catch (error) {
    console.error("Password request error:", error);

    return NextResponse.json(
      {
        message: "Unable to prepare reset.",
      },
      { status: 500 }
    );
  }
}