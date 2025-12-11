/**
 * Resend Email Client
 * Handles transactional emails for the course platform
 */

import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// From address - update domain once verified in Resend
const FROM_EMAIL = 'Self Actualized Life <noreply@selfactualize.life>';
const SUPPORT_EMAIL = 'support@selfactualize.life';

interface WelcomeEmailParams {
  to: string;
  name: string;
  tempPassword: string;
  courseName?: string;
  isBundle?: boolean;
}

/**
 * Send welcome email to new paying customer
 */
export async function sendWelcomeEmail({
  to,
  name,
  tempPassword,
  courseName,
  isBundle,
}: WelcomeEmailParams) {
  const loginUrl = 'https://selfactualize.life/login';
  const dashboardUrl = 'https://selfactualize.life/dashboard';

  const subject = isBundle
    ? `Welcome to The Self Actualized Life - All Courses Unlocked!`
    : `Welcome to ${courseName || 'Your Course'} - Let's Begin`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 400; color: #d4af37; font-family: Georgia, serif;">
                The Self Actualized Life
              </h1>
            </td>
          </tr>

          <!-- Main Content Card -->
          <tr>
            <td style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(10, 10, 10, 1) 100%); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 16px; padding: 40px;">

              <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #ffffff; font-family: Georgia, serif;">
                Welcome, ${name}!
              </h2>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.8);">
                ${isBundle
                  ? `You now have access to all 6 courses in The Self Actualized Life curriculum. Your transformation journey begins now.`
                  : `You're enrolled in <strong style="color: #d4af37;">${courseName}</strong>. Your transformation journey begins now.`
                }
              </p>

              <!-- Credentials Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                <tr>
                  <td style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 1px;">
                      Your Login Credentials
                    </p>
                    <p style="margin: 0 0 12px 0; font-size: 16px; color: #ffffff;">
                      <strong>Email:</strong> ${to}
                    </p>
                    <p style="margin: 0; font-size: 16px; color: #ffffff;">
                      <strong>Temporary Password:</strong> <code style="background-color: rgba(212, 175, 55, 0.2); padding: 4px 8px; border-radius: 4px; color: #d4af37;">${tempPassword}</code>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 30px 0; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.6);">
                We recommend changing your password after your first login.
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #b8962e 100%); color: #000000; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 32px; border-radius: 8px;">
                      Start Learning →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: rgba(255, 255, 255, 0.4);">
                Questions? Reply to this email or contact ${SUPPORT_EMAIL}
              </p>
              <p style="margin: 0; font-size: 12px; color: rgba(255, 255, 255, 0.3);">
                © ${new Date().getFullYear()} The Self Actualized Life. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
Welcome to The Self Actualized Life, ${name}!

${isBundle
  ? `You now have access to all 6 courses in The Self Actualized Life curriculum.`
  : `You're enrolled in ${courseName}.`
}

Your Login Credentials:
Email: ${to}
Temporary Password: ${tempPassword}

Login here: ${loginUrl}
Go to your dashboard: ${dashboardUrl}

We recommend changing your password after your first login.

Questions? Contact ${SUPPORT_EMAIL}
  `.trim();

  try {
    const client = getResendClient();
    const { data, error } = await client.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log(`Welcome email sent to ${to}, id: ${data?.id}`);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}
