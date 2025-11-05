/* eslint-disable no-undef */
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
});

export const sendConfirmationEmail = async (
  email: string,
  entryId: string,
  title: string,
  fullName: string
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Cut to Black Prize: Submission Received',
    html: /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cut to Black Prize Confirmation</title>
        <style>
          .details-table { 
            border: 1px solid #D4AF37; 
            border-radius: 4px; 
            overflow: hidden; 
            margin: 20px 0; 
          }
          .details-table td { 
            padding: 15px; 
            border-bottom: 1px solid #eee; 
          }
          .details-table tr:last-child td { border-bottom: none; }
          .cta-button { 
            background-color: #D4AF37; 
            color: #000; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 4px; 
            font-weight: bold; 
            display: inline-block; 
            margin: 20px 0; 
            border: 1px solid #D4AF37; 
          }
          .footer-link { 
            color: #D4AF37; 
            text-decoration: none; 
            margin: 0 10px; 
            border-bottom: 1px solid #D4AF37; 
            padding-bottom: 2px; 
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #333; line-height: 1.5;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f8f8; padding: 20px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #000; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border: 1px solid #D4AF37;">
                <!-- Header -->
                <tr>
                  <td align="center" style="background-color: #D4AF37; padding: 20px;">
                    <h1 style="margin: 0; color: #000; font-size: 24px; font-weight: bold;">Cut to Black Prize</h1>
                    <p style="margin: 5px 0 0 0; color: #000; font-size: 14px; font-style: italic;">Exclusive Screenwriting Competition</p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px; background-color: #f8f8f8; color: #333;">
                    <h2 style="margin: 0 0 20px; color: #000; font-size: 20px;">Hey ${fullName},</h2>
                    
                    <p style="margin: 0 0 20px;">Thank you for entrusting your screenplay to the <strong>Cut to Black Prize</strong>—an elite, invitation-only competition dedicated to recognizing innovative and original screenwriting. We value your contribution and are excited to include your work in our blind judging process.</p>
                    
                    <p style="margin: 0 0 30px;">Your submission has been securely received, anonymized, and queued for review by our distinguished panel of industry professionals.</p>
                    
                    <!-- Submission Details Table -->
                    <table role="presentation" class="details-table" style="width: 100%; border-collapse: collapse; background-color: #fff;">
                      <tr style="background-color: #f9f9f9;">
                        <td style="font-weight: bold; width: 40%;">Invitation Code:</td>
                        <td>${entryId}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold;">Script Title:</td>
                        <td>${title}</td>
                      </tr>
                      <tr style="background-color: #f9f9f9;">
                        <td style="font-weight: bold;">Status:</td>
                        <td>Received</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold;">Submitted:</td>
                        <td>${new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}</td>
                      </tr>
                    </table>
                    
                    <p style="margin: 20px 0; line-height: 1.5;"><strong>Next Steps:</strong></p>
                    <ul style="margin: 0 0 20px; padding-left: 20px;">
                      <li>Your entry will undergo initial screening within 2-4 weeks.</li>
                      <li>Shortlist notifications will be sent by February 15, 2026.</li>
                      <li>Final winners announced April 30, 2026—stay tuned!</li>
                    </ul>
                    
                    <p style="text-align: center; margin: 20px 0;">
                      <a href="https://cuttoblackprize.com/the-prize" class="cta-button" style="background-color: #D4AF37; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; margin: 20px 0; border: 1px solid #D4AF37;">View Prize Details</a>
                    </p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">In the meantime, discover inspiration from our <a href="https://cuttoblackprize.com/winners" style="color: #D4AF37; text-decoration: none;">past winners</a> or revisit the <a href="https://cuttoblackprize.com/rules" style="color: #D4AF37; text-decoration: none;">official rules</a>.</p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">Should you have any questions or need support, please contact us at <a href="mailto:info@cuttoblackprize.com" style="color: #D4AF37; text-decoration: none;">info@cuttoblackprize.com</a>.</p>
                    
                    <p style="margin: 10px 0 0 0; font-style: italic; color: #666;">Your story matters. We're honored to champion it.</p>
                    <p style="margin: 0; font-style: italic; color: #666;">The Cut to Black Prize Team</p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px 30px; background-color: #000; color: #f8f8f8; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2025 Cut to Black Prize. All rights reserved.</p>
                    <p style="margin: 0;">
                      <a href="https://cuttoblackprize.com/rules" class="footer-link" style="color: #D4AF37; text-decoration: none; margin: 0 10px; border-bottom: 1px solid #D4AF37; padding-bottom: 2px;">Official Rules</a> |
                      <a href="https://cuttoblackprize.com/privacy" class="footer-link" style="color: #D4AF37; text-decoration: none; margin: 0 10px; border-bottom: 1px solid #D4AF37; padding-bottom: 2px;">Privacy Policy</a>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">This is an automated confirmation. For inquiries, reply directly.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };
  await transporter.sendMail(mailOptions);
};

export const sendInvitationCode = async (
  email: string,
  code: string,
  subject: string,
  fullName: string
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cut to Black Prize Invitation</title>
        <style>
          .code-box { 
            background-color: #D4AF37; 
            color: #000; 
            padding: 20px; 
            text-align: center; 
            font-size: 24px; 
            font-weight: bold; 
            font-family: 'Courier New', monospace; 
            letter-spacing: 2px; 
            border-radius: 4px; 
            margin: 20px 0; 
            border: 2px solid #D4AF37; /* Added subtle gold border for emphasis */
          }
          .cta-button { background-color: #D4AF37; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; margin: 20px 0; border: 1px solid #D4AF37; } /* Added border to CTA for polish */
          .footer-link { color: #D4AF37; text-decoration: none; margin: 0 10px; }
          .details-table { border: 1px solid #D4AF37; border-radius: 4px; overflow: hidden; } /* Added border to any details table if extended */
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #333; line-height: 1.5;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f8f8; padding: 20px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #000; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border: 1px solid #D4AF37;"> <!-- Added subtle border to main container -->
                <!-- Header -->
                <tr>
                  <td align="center" style="background-color: #D4AF37; padding: 20px;">
                    <h1 style="margin: 0; color: #000; font-size: 24px; font-weight: bold;">Cut to Black Prize</h1>
                    <p style="margin: 5px 0 0 0; color: #000; font-size: 14px; font-style: italic;">Exclusive Screenwriting Competition</p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px; background-color: #f8f8f8; color: #333;">
                    <h2 style="margin: 0 0 20px; color: #000; font-size: 20px;">Hey ${fullName},</h2>
                    
                    <p style="margin: 0 0 20px;">We're thrilled to invite you to participate in the <strong>Cut to Black Prize</strong>—an elite, invitation-only competition celebrating bold and innovative screenwriting. Your work has caught our attention, and we believe your voice deserves a spotlight.</p>
                    
                    <p style="margin: 0 0 30px;">As an invited entrant, you now have exclusive access to submit your screenplay. This opportunity is limited to select creators like yourself.</p>
                    
                    <!-- Invitation Code Box -->
                    <div class="code-box">
                      Your Invitation Code: ${code}
                    </div>
                    
                    <p style="margin: 20px 0; text-align: center; font-size: 16px; font-weight: bold; color: #000;">
                      Use this code to unlock your submission portal.
                    </p>
                    
                    <!-- CTA Button -->
                    <p style="text-align: center; margin: 20px 0;">
                      <a href="https://cuttoblackprize.com/submit" class="cta-button" style="background-color: #D4AF37; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; border: 1px solid #D4AF37;">Enter Contest Now</a>
                    </p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;"><strong>How to Submit:</strong></p>
                    <ol style="margin: 0 0 20px; padding-left: 20px;">
                      <li>Click the button above or visit <a href="https://cuttoblackprize.com/submit" style="color: #D4AF37; text-decoration: none;">cuttoblackprize.com/submit</a>.</li>
                      <li>Enter your invitation code: <strong>${code}</strong>.</li>
                      <li>Complete the form with your screenplay (PDF, max 20MB) and details.</li>
                      <li>Agree to terms and submit—confirmation will follow instantly.</li>
                    </ol>
                    
                    <p style="margin: 20px 0; line-height: 1.5;"><strong>Key Dates:</strong> Submissions close December 31, 2025. Shortlist notifications in February 2026. Winners announced April 2026.</p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">Explore more about <a href="https://cuttoblackprize.com/the-prize" style="color: #D4AF37; text-decoration: none;">the prizes</a>, <a href="https://cuttoblackprize.com/winners" style="color: #D4AF37; text-decoration: none;">past winners</a>, and <a href="https://cuttoblackprize.com/rules" style="color: #D4AF37; text-decoration: none;">official rules</a>.</p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">Questions? Reply to this email or reach us at <a href="mailto:info@cuttoblackprize.com" style="color: #D4AF37; text-decoration: none;">info@cuttoblackprize.com</a>.</p>
                    
                    <p style="margin: 10px 0 0 0; font-style: italic; color: #666;">We can't wait to read your script!</p>
                    <p style="margin: 0; font-style: italic; color: #666;">The Cut to Black Prize Team</p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px 30px; background-color: #000; color: #f8f8f8; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2025 Cut to Black Prize. All rights reserved.</p>
                    <p style="margin: 0;">
                      <a href="https://cuttoblackprize.com/rules" class="footer-link" style="color: #D4AF37; text-decoration: none;">Official Rules</a> |
                      <a href="https://cuttoblackprize.com/privacy" class="footer-link" style="color: #D4AF37; text-decoration: none;">Privacy Policy</a> |
                      <a href="https://cuttoblackprize.com/contact" class="footer-link" style="color: #D4AF37; text-decoration: none;">Contact Us</a>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">This is a personalized invitation. Please treat your code confidentially.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };
  await transporter.sendMail(mailOptions);
};

export const sendAdminNotification = async (
  adminEmail: string,
  entryId: string,
  title: string
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: '🚨 New Screenplay Submission: Cut to Black Prize',
    html: /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Submission Alert</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #333;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f8f8; padding: 20px;">
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #000; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #D4AF37; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; color: #000; font-size: 24px; font-weight: bold;">Cut to Black Prize - New Submission</h1>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px; background-color: #f8f8f8; color: #333;">
                    <h2 style="margin: 0 0 20px; color: #000; font-size: 20px;">Alert: Fresh Entry Received</h2>
                    <p style="margin: 0 0 20px; line-height: 1.5;">A new screenplay has been submitted to the contest. Please review promptly to ensure timely judging.</p>
                    
                    <!-- Submission Details Table -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #fff; border-radius: 4px;">
                      <tr>
                        <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Entry ID:</td>
                        <td style="padding: 15px; border-bottom: 1px solid #eee;">${entryId}</td>
                      </tr>
                      <tr style="background-color: #f9f9f9;">
                        <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold;">Script Title:</td>
                        <td style="padding: 15px; border-bottom: 1px solid #eee;">${title}</td>
                      </tr>
                      <tr>
                        <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold;">Status:</td>
                        <td style="padding: 15px; border-bottom: 1px solid #eee;">Received</td>
                      </tr>
                      <tr>
                        <td style="padding: 15px; font-weight: bold;">Submitted:</td>
                        <td style="padding: 15px;">${new Date().toLocaleDateString()}</td>
                      </tr>
                    </table>
                    
                    <p style="margin: 20px 0; line-height: 1.5;"><strong>Action Required:</strong> Log in to the <a href="https://cuttoblackprize.com/admin/dashboard" style="color: #D4AF37; text-decoration: none; font-weight: bold;">admin dashboard</a> to view full details, download files, and update status.</p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">For questions, reply to this email or contact support.</p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #000; color: #f8f8f8; text-align: center; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2025 Cut to Black Prize. Automated Notification.</p>
                    <p style="margin: 0; font-size: 12px;">This is an automated message. Please do not reply directly.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };
  await transporter.sendMail(mailOptions);
};
