import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SENDER_EMAIL =
  process.env.RESEND_FROM_EMAIL || "eShopBD <onboarding@resend.dev>";

/**
 * Send 6-digit OTP email for account verification
 */
export async function sendVerificationOtpEmail({
  to,
  name,
  otp,
}: {
  to: string;
  name?: string;
  otp: string;
}) {
  try {
    const displayName = name?.trim() || "সম্মানিত গ্রাহক";

    const htmlContent = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>eShopBD ভেরিফিকেশন কোড</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); padding: 28px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">
                eShop<span style="color: #fef08a;">BD</span>
              </h1>
              <p style="margin: 6px 0 0 0; color: #ccfbf1; font-size: 13px; font-weight: 500;">
                আপনার বিশ্বস্ত অনলাইন শপিং পার্টনার
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="margin: 0 0 12px 0; color: #0f172a; font-size: 19px; font-weight: 700;">
                অ্যাকাউন্ট ভেরিফিকেশন কোড
              </h2>
              <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                প্রিয় <strong>${displayName}</strong>,<br>
                eShopBD-তে রেজিস্ট্রেশন করার জন্য ধন্যবাদ! আপনার অ্যাকাউন্টটি সুরক্ষিতভাবে ভেরিফাই করার জন্য নিচের ৬ ডিজিটের ওটিপি (OTP) কোডটি ব্যবহার করুন:
              </p>

              <!-- OTP Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
                <tr>
                  <td align="center">
                    <div style="background-color: #f0fdfa; border: 2px dashed #0d9488; border-radius: 12px; padding: 18px 24px; display: inline-block;">
                      <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0f766e; font-family: monospace;">
                        ${otp}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 12px 0; color: #64748b; font-size: 13px; text-align: center;">
                ⏱️ এই কোডটি আগামী <strong>১০ মিনিটের</strong> জন্য কার্যকর থাকবে।
              </p>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 14px; border-radius: 6px; margin: 24px 0 0 0;">
                <p style="margin: 0; color: #92400e; font-size: 12px; line-height: 1.5;">
                  <strong>নিরাপত্তা সতর্কতা:</strong> এই কোডটি কখনোই অন্য কারো সাথে শেয়ার করবেন না। eShopBD সাপোর্ট টিম কখনোই আপনার ওটিপি কোড জানতে চাইবে না।
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                © ${new Date().getFullYear()} eShopBD. সর্বস্বত্ব সংরক্ষিত।<br>
                আপনি যদি অ্যাকাউন্ট খোলার অনুরোধ না করে থাকেন, তবে এই ইমেইলটি উপেক্ষা করুন।
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to,
      subject: `[eShopBD] ${otp} - আপনার অ্যাকাউন্ট ভেরিফিকেশন কোড`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend Error] Failed to send OTP email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error sending OTP email";
    console.error("[Email Service Exception]:", msg);
    return { success: false, error: msg };
  }
}

/**
 * Send Welcome Email upon successful account creation
 */
export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name?: string;
}) {
  try {
    const displayName = name?.trim() || "সম্মানিত গ্রাহক";
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://e-shop-bd-gamma.vercel.app";

    const htmlContent = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>স্বাগতম eShopBD পরিবারে!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Hero Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #115e59 100%); padding: 36px 24px; text-align: center;">
              <span style="background-color: rgba(255,255,255,0.2); color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                স্বাগতম
              </span>
              <h1 style="margin: 12px 0 6px 0; color: #ffffff; font-size: 28px; font-weight: 800;">
                eShop<span style="color: #fef08a;">BD</span> পরিবারে স্বাগতম! 🎉
              </h1>
              <p style="margin: 0; color: #ccfbf1; font-size: 14px;">
                সেরা দাম, দ্রুত ডেলিভারি ও ১০০% আসল পণ্যের নিশ্চয়তা
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.6;">
                প্রিয় <strong>${displayName}</strong>,<br>
                eShopBD-তে সফলভাবে আপনার অ্যাকাউন্ট তৈরি হয়েছে! এখন থেকে আপনি উপভোগ করতে পারবেন দেশের সেরা সব ট্রেন্ডি গ্যাজেটস, ইলেকট্রনিক্স ও কিডস টয়েজ সেরা ডিসকাউন্টে।
              </p>

              <!-- Coupon Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0; background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1.5px dashed #f59e0b; border-radius: 12px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <span style="color: #b45309; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      🎁 আপনার জন্য প্রথম অর্ডারে উপহার
                    </span>
                    <h3 style="margin: 6px 0; color: #78350f; font-size: 22px; font-weight: 800;">
                      ১০% ফ্ল্যাট ডিসকাউন্ট
                    </h3>
                    <p style="margin: 0 0 10px 0; color: #92400e; font-size: 13px;">
                      চেকআউটে নিচের প্রোমোকোডটি ব্যবহার করুন:
                    </p>
                    <div style="background-color: #ffffff; border: 1px solid #fde68a; display: inline-block; padding: 8px 18px; border-radius: 8px;">
                      <span style="font-size: 18px; font-weight: 800; color: #b45309; letter-spacing: 2px; font-family: monospace;">
                        WELCOME10
                      </span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Highlights Grid -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 20px 0 28px 0;">
                <tr>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <div style="font-size: 24px;">🚚</div>
                    <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 4px;">দ্রুত ডেলিভারি</div>
                    <div style="font-size: 11px; color: #64748b;">সারাদেশে ক্যাশ অন</div>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <div style="font-size: 24px;">🛡️</div>
                    <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 4px;">১০০% আসল পণ্য</div>
                    <div style="font-size: 11px; color: #64748b;">ওয়ারেন্টি সহ</div>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <div style="font-size: 24px;">🔄</div>
                    <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 4px;">৭ দিনের রিটার্ন</div>
                    <div style="font-size: 11px; color: #64748b;">সহজ শর্তে ফেরত</div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 10px 0;">
                <tr>
                  <td align="center">
                    <a href="${appUrl}" style="background-color: #0d9488; color: #ffffff; padding: 14px 32px; border-radius: 10px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 10px rgba(13,148,136,0.25);">
                      শপিং শুরু করুন 🛍️
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 22px 24px; text-align: center; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0 0 6px 0; color: #64748b; font-size: 12px;">
                যেকোনো প্রয়োজনে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 11px;">
                © ${new Date().getFullYear()} eShopBD Online Shopping. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to,
      subject: `স্বাগতম eShopBD পরিবারে, ${displayName}! 🎉`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend Error] Failed to send welcome email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error sending welcome email";
    console.error("[Email Service Exception]:", msg);
    return { success: false, error: msg };
  }
}
