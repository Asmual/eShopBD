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
    const displayName = name?.trim() || "Valued Customer";

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>eShopBD Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); padding: 30px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">
                eShop<span style="color: #fef08a;">BD</span>
              </h1>
              <p style="margin: 6px 0 0 0; color: #ccfbf1; font-size: 13px; font-weight: 500;">
                Your Trusted Online Shopping Destination
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 34px 28px;">
              <h2 style="margin: 0 0 12px 0; color: #0f172a; font-size: 20px; font-weight: 700;">
                Account Verification Code
              </h2>
              <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                Hi <strong>${displayName}</strong>,<br>
                Thank you for creating an account with eShopBD! Please enter the 6-digit verification code below to complete your registration:
              </p>

              <!-- OTP Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 26px 0;">
                <tr>
                  <td align="center">
                    <div style="background-color: #f0fdfa; border: 2px dashed #0d9488; border-radius: 12px; padding: 18px 26px; display: inline-block;">
                      <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0f766e; font-family: monospace;">
                        ${otp}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 14px 0; color: #64748b; font-size: 13px; text-align: center;">
                ⏱️ This code will expire in <strong>10 minutes</strong>.
              </p>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 14px 16px; border-radius: 6px; margin: 24px 0 0 0;">
                <p style="margin: 0; color: #92400e; font-size: 12px; line-height: 1.5;">
                  <strong>Security Note:</strong> Never share this code with anyone. eShopBD support staff will never ask for your verification code.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 22px 24px; text-align: center; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                © ${new Date().getFullYear()} eShopBD. All rights reserved.<br>
                If you did not request this verification code, please ignore this email.
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
      subject: `[eShopBD] ${otp} is your verification code`,
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
    const displayName = name?.trim() || "Valued Customer";
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://e-shop-bd-gamma.vercel.app";

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to eShopBD!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Hero Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #115e59 100%); padding: 36px 24px; text-align: center;">
              <span style="background-color: rgba(255,255,255,0.2); color: #ffffff; padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                WELCOME
              </span>
              <h1 style="margin: 12px 0 6px 0; color: #ffffff; font-size: 28px; font-weight: 800;">
                Welcome to eShop<span style="color: #fef08a;">BD</span>! 🎉
              </h1>
              <p style="margin: 0; color: #ccfbf1; font-size: 14px;">
                Best Prices, Fast Delivery & 100% Genuine Products
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 34px 28px;">
              <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.6;">
                Hi <strong>${displayName}</strong>,<br>
                Your eShopBD account has been successfully created! You can now explore Bangladesh's premier catalog of trending electronics, smart gadgets, and kids' toys at unbeatable prices.
              </p>

              <!-- Coupon Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0; background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1.5px dashed #f59e0b; border-radius: 12px;">
                <tr>
                  <td style="padding: 22px; text-align: center;">
                    <span style="color: #b45309; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      🎁 Welcome Gift for Your First Order
                    </span>
                    <h3 style="margin: 6px 0; color: #78350f; font-size: 22px; font-weight: 800;">
                      10% FLAT DISCOUNT
                    </h3>
                    <p style="margin: 0 0 10px 0; color: #92400e; font-size: 13px;">
                      Use this promo code at checkout:
                    </p>
                    <div style="background-color: #ffffff; border: 1px solid #fde68a; display: inline-block; padding: 8px 20px; border-radius: 8px;">
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
                    <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 4px;">Fast Delivery</div>
                    <div style="font-size: 11px; color: #64748b;">Nationwide COD</div>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <div style="font-size: 24px;">🛡️</div>
                    <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 4px;">100% Authentic</div>
                    <div style="font-size: 11px; color: #64748b;">Warranty Backed</div>
                  </td>
                  <td width="33%" style="text-align: center; padding: 10px;">
                    <div style="font-size: 24px;">🔄</div>
                    <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 4px;">7-Day Returns</div>
                    <div style="font-size: 11px; color: #64748b;">Hassle-Free Policy</div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 10px 0;">
                <tr>
                  <td align="center">
                    <a href="${appUrl}" style="background-color: #0d9488; color: #ffffff; padding: 14px 34px; border-radius: 10px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 10px rgba(13,148,136,0.25);">
                      Start Shopping 🛍️
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
                Have questions? Contact our customer support team anytime.
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
      subject: `Welcome to the eShopBD Family, ${displayName}! 🎉`,
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
