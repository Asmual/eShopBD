import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";
import { sendVerificationOtpEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const pool = getDbPool();

    // 1. Check if user already exists in Neon DB
    const existingUser = await pool.query(
      `SELECT id FROM "user" WHERE LOWER(email) = $1 LIMIT 1`,
      [cleanEmail]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 400 }
      );
    }

    // 2. Generate secure 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    const id = crypto.randomUUID();

    // 3. Clear any previous OTPs for this email and store the new one
    await pool.query(
      `DELETE FROM "verification" WHERE identifier = $1`,
      [cleanEmail]
    );

    await pool.query(
      `INSERT INTO "verification" (id, identifier, value, "expiresAt", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())`,
      [id, cleanEmail, otp, expiresAt]
    );

    // 4. Send the OTP email via Resend
    console.log(`[OTP Generated] Email: ${cleanEmail} | OTP: ${otp}`);
    const emailResult = await sendVerificationOtpEmail({
      to: cleanEmail,
      name,
      otp,
    });

    if (!emailResult.success) {
      console.error("[OTP Send Error]:", emailResult.error);
      return NextResponse.json(
        {
          error:
            emailResult.error ||
            "Unable to send verification code. Please check that your email address is correct and try again.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "A 6-digit verification code has been sent to your email.",
    });
  } catch (error: unknown) {
    console.error("[OTP Send API Exception]:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: `Server error: ${msg}` },
      { status: 500 }
    );
  }
}
