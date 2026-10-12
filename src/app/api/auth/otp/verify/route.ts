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
        { error: "ইমেইল, পাসওয়ার্ড এবং ওটিপি কোড বাধ্যতামূলক।" },
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
        { error: "কোনো ভেরিফিকেশন কোড পাওয়া যায়নি। দয়া করে নতুন কোডের জন্য অনুরোধ করুন।" },
        { status: 400 }
      );
    }

    const verificationRecord = result.rows[0];

    // 2. Check if code matches
    if (verificationRecord.value !== cleanOtp) {
      return NextResponse.json(
        { error: "ভুল ওটিপি কোড! দয়া করে আপনার ইমেইল চেক করে সঠিক ৬ ডিজিটের কোডটি দিন।" },
        { status: 400 }
      );
    }

    // 3. Check expiration
    if (new Date(verificationRecord.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: "এই ওটিপি কোডের ১০ মিনিটের মেয়াদ শেষ হয়ে গেছে। দয়া করে নতুন কোড পাঠান।" },
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
    // Send asynchronously in background so response isn't delayed
    sendWelcomeEmail({
      to: cleanEmail,
      name: name || cleanEmail.split("@")[0],
    }).catch((welcomeErr) => {
      console.error("[Welcome Email Background Error]:", welcomeErr);
    });

    return NextResponse.json({
      success: true,
      message: "অ্যাকাউন্ট সফলভাবে ভেরিফাই ও তৈরি হয়েছে! স্বাগতম eShopBD-তে।",
    });
  } catch (error: unknown) {
    console.error("[OTP Verify API Error]:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: `ভেরিফিকেশন সম্পন্ন করা যায়নি: ${msg}` },
      { status: 500 }
    );
  }
}
