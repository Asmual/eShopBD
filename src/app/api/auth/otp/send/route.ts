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
        { error: "অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস প্রদান করুন।" },
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
        { error: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা আছে। দয়া করে লগইন করুন।" },
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
    const emailResult = await sendVerificationOtpEmail({
      to: cleanEmail,
      name,
      otp,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          error:
            "ইমেইল পাঠাতে সমস্যা হয়েছে। দয়া করে নিশ্চিত করুন আপনার ইমেইল সঠিক এবং আবার চেষ্টা করুন।",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "আপনার ইমেইলে ৬ ডিজিটের ভেরিফিকেশন কোড পাঠানো হয়েছে!",
    });
  } catch (error: unknown) {
    console.error("[OTP Send API Error]:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: `সার্ভার ত্রুটি: ${msg}` },
      { status: 500 }
    );
  }
}
