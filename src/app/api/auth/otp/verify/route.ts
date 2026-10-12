import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";
import { auth } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp, name, password } = body;

    if (!email || !otp || !password) {
      return NextResponse.json(
        { error: "Email, password, and verification code are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();
    const pool = getDbPool();

    // 1. Fetch verification record from Neon DB
    const result = await pool.query(
      `SELECT id, value, "expiresAt" FROM "verification"
       WHERE identifier = $1 ORDER BY "createdAt" DESC LIMIT 1`,
      [cleanEmail]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "No verification code found for this email. Please request a new code." },
        { status: 400 }
      );
    }

    const verificationRecord = result.rows[0];

    // 2. Check if code matches
    if (verificationRecord.value !== cleanOtp) {
      return NextResponse.json(
        { error: "Invalid verification code. Please check your email and enter the correct 6-digit code." },
        { status: 400 }
      );
    }

    // 3. Check expiration
    if (new Date(verificationRecord.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: "This verification code has expired. Please request a new code." },
        { status: 400 }
      );
    }

    // 4. Delete the used verification OTP
    await pool.query(
      `DELETE FROM "verification" WHERE identifier = $1`,
      [cleanEmail]
    );

    // 5. Create user in Better Auth
    try {
      await auth.api.signUpEmail({
        body: {
          email: cleanEmail,
          password: password,
          name: name || cleanEmail.split("@")[0],
        },
      });
    } catch (authErr: unknown) {
      // Check if user was already created during previous step
      const existing = await pool.query(
        `SELECT id FROM "user" WHERE LOWER(email) = $1 LIMIT 1`,
        [cleanEmail]
      );
      if (existing.rows.length === 0) {
        throw authErr;
      }
    }

    // 6. Ensure user email is marked as verified in Neon DB
    await pool.query(
      `UPDATE "user" SET "emailVerified" = true, "updatedAt" = NOW() WHERE LOWER(email) = $1`,
      [cleanEmail]
    );

    // 7. Send the Welcome Email via Resend
    sendWelcomeEmail({
      to: cleanEmail,
      name: name || cleanEmail.split("@")[0],
    }).catch((welcomeErr) => {
      console.error("[Welcome Email Background Error]:", welcomeErr);
    });

    return NextResponse.json({
      success: true,
      message: "Account verified and created successfully! Welcome to eShopBD.",
    });
  } catch (error: unknown) {
    console.error("[OTP Verify API Error]:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: `Verification failed: ${msg}` },
      { status: 500 }
    );
  }
}
