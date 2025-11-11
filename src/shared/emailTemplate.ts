/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { ICreateAccount, IResetPassword } from '../types/emailTamplate';

const createAccount = (values: ICreateAccount) => {
  const data = {
    to: values.email,
    subject: 'Verify your account',
    html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <img src="https://i.postimg.cc/6pgNvKhD/logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
          <h2 style="color: #277E16; font-size: 24px; margin-bottom: 20px;">Hey! ${values.name}, Your Toothlens Account Credentials</h2>
        <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
            <div style="background-color: #277E16; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
        </div>
    </div>
</body>`,
  };
  return data;
};

const resetPassword = (values: IResetPassword) => {
  const data = {
    to: values.email,
    subject: 'Reset your password',
    html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <img src="https://i.postimg.cc/6pgNvKhD/logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
        <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
            <div style="background-color: #277E16; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
                <p style="color: #b9b4b4; font-size: 16px; line-height: 1.5; margin-bottom: 20px;text-align:left">If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.</p>
        </div>
    </div>
</body>`,
  };
  return data;
};

const sendConfirmationEmail = (values: any) => {
  const data = {
    from: process.env.EMAIL_USER,
    to: values.email,
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
                    <h2 style="margin: 0 0 20px; color: #000; font-size: 20px;">Hey ${
                      values.fullName
                    },</h2>
                    
                    <p style="margin: 0 0 20px;">Thank you for entrusting your screenplay to the <strong>Cut to Black Prize</strong>—an elite, invitation-only competition dedicated to recognizing innovative and original screenwriting. We value your contribution and are excited to include your work in our blind judging process.</p>
                    
                    <p style="margin: 0 0 30px;">Your submission has been securely received, anonymized, and queued for review by our distinguished panel of industry professionals.</p>
                    
                    <!-- Submission Details Table -->
                    <table role="presentation" class="details-table" style="width: 100%; border-collapse: collapse; background-color: #fff;">
                      <tr style="background-color: #f9f9f9;">
                        <td style="font-weight: bold; width: 40%;">Invitation Code:</td>
                        <td>${values.code}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold;">Script Title:</td>
                        <td>${values.title}</td>
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
                      <a href="${
                        process.env.LIVE_URL
                      }/the-prize" class="cta-button" style="background-color: #D4AF37; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; margin: 20px 0; border: 1px solid #D4AF37;">View Prize Details</a>
                    </p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">In the meantime, discover inspiration from our <a href="${
                      process.env.LIVE_URL
                    }/winners" style="color: #D4AF37; text-decoration: none;">past winners</a> or revisit the <a href="${
      process.env.LIVE_URL
    }/rules" style="color: #D4AF37; text-decoration: none;">official rules</a>.</p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">Should you have any questions or need support, please contact us at <a href="mailto:info@${
                      process.env.URL
                    }" style="color: #D4AF37; text-decoration: none;">info@${
      process.env.URL
    }</a>.</p>
                    
                    <p style="margin: 10px 0 0 0; font-style: italic; color: #666;">Your story matters. We're honored to champion it.</p>
                    <p style="margin: 0; font-style: italic; color: #666;">The Cut to Black Prize Team</p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px 30px; background-color: #000; color: #f8f8f8; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2025 Cut to Black Prize. All rights reserved.</p>
                    <p style="margin: 0;">
                      <a href="${
                        process.env.LIVE_URL
                      }/rules" class="footer-link" style="color: #D4AF37; text-decoration: none; margin: 0 10px; border-bottom: 1px solid #D4AF37; padding-bottom: 2px;">Official Rules</a> |
                      <a href="${
                        process.env.LIVE_URL
                      }/privacy" class="footer-link" style="color: #D4AF37; text-decoration: none; margin: 0 10px; border-bottom: 1px solid #D4AF37; padding-bottom: 2px;">Privacy Policy</a>
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
  return data;
};

const sendForgetInviteCodeEmail = (values: any) => {
  const data = {
    from: process.env.EMAIL_USER,
    to: values.email,
    subject: `Cut to Black Prize: Your Invitation Code Reminder - ${values.title}`,
    html: /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cut to Black Prize Code Reminder</title>
        <style>
          .code-box { 
            background-color: #f9f9f9; 
            color: #000; 
            padding: 20px; 
            text-align: center; 
            font-size: 24px; 
            font-weight: bold; 
            font-family: 'Courier New', monospace; 
            letter-spacing: 2px; 
            border-radius: 4px; 
            margin: 20px 0; 
            border: 2px solid #D4AF37; 
          }
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
                    <h2 style="margin: 0 0 20px; color: #000; font-size: 20px;">Dear ${values.fullName},</h2>
                    
                    <p style="margin: 0 0 20px;">We've received your request to retrieve your invitation code for the <strong>Cut to Black Prize</strong>. No worries—it's easy to get back on track with your submission.</p>
                    
                    <p style="margin: 0 0 30px;">Your exclusive code is below. This is a one-time-use invitation, so please use it promptly to submit your screenplay.</p>
                    
                    <!-- Invitation Code Box -->
                    <div class="code-box">
                      Invitation Code: ${values.code}
                    </div>
                    
                    <p style="margin: 20px 0; text-align: center; font-size: 16px; font-weight: bold; color: #000;">
                      Ready to submit? Enter this code on our portal.
                    </p>
                    
                    <!-- CTA Button -->
                    <p style="text-align: center; margin: 20px 0;">
                      <a href="${process.env.LIVE_URL}/submit" class="cta-button">Access Submission Portal</a>
                    </p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;"><strong>Quick Reminder:</strong></p>
                    <ul style="margin: 0 0 20px; padding-left: 20px;">
                      <li>Visit <a href="${process.env.LIVE_URL}/submit" style="color: #D4AF37; text-decoration: none;">${process.env.URL}/submit</a> and input your code.</li>
                      <li>Upload your PDF screenplay (max 20MB) and complete the form.</li>
                      <li>Deadline: December 31, 2025—don't miss out!</li>
                    </ul>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">If this isn't what you expected or you need further assistance, reply to this email or contact <a href="mailto:info@${process.env.URL}" style="color: #D4AF37; text-decoration: none;">info@${process.env.URL}</a>.</p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">Discover more about <a href="${process.env.LIVE_URL}/the-prize" style="color: #D4AF37; text-decoration: none;">the prizes</a>, <a href="${process.env.LIVE_URL}/winners" style="color: #D4AF37; text-decoration: none;">past winners</a>, and <a href="${process.env.LIVE_URL}/rules" style="color: #D4AF37; text-decoration: none;">official rules</a>.</p>
                    
                    <p style="margin: 10px 0 0 0; font-style: italic; color: #666;">Your creativity is our inspiration.</p>
                    <p style="margin: 0; font-style: italic; color: #666;">The Cut to Black Prize Team</p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px 30px; background-color: #000; color: #f8f8f8; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2025 Cut to Black Prize. All rights reserved.</p>
                    <p style="margin: 0;">
                      <a href="${process.env.LIVE_URL}/rules" class="footer-link">Official Rules</a> |
                      <a href="${process.env.LIVE_URL}/privacy" class="footer-link">Privacy Policy</a> |
                      <a href="${process.env.LIVE_URL}/contact" class="footer-link">Contact Us</a>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">This is an automated reminder. For security, never share your code.</p>
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

  return data;
};

const sendInvitationCode = (values: any) => {
  const data = {
    from: process.env.EMAIL_USER,
    to: values.email,
    subject: values.subject,
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
                    <h2 style="margin: 0 0 20px; color: #000; font-size: 20px;">Hey ${values.fullName},</h2>
                    
                    <p style="margin: 0 0 20px;">We're thrilled to invite you to participate in the <strong>Cut to Black Prize</strong>—an elite, invitation-only competition celebrating bold and innovative screenwriting. Your work has caught our attention, and we believe your voice deserves a spotlight.</p>
                    
                    <p style="margin: 0 0 30px;">As an invited entrant, you now have exclusive access to submit your screenplay. This opportunity is limited to select creators like yourself.</p>
                    
                    <!-- Invitation Code Box -->
                    <div class="code-box">
                      Your Invitation Code: ${values.code}
                    </div>
                    
                    <p style="margin: 20px 0; text-align: center; font-size: 16px; font-weight: bold; color: #000;">
                      Use this code to unlock your submission portal.
                    </p>
                    
                    <!-- CTA Button -->
                    <p style="text-align: center; margin: 20px 0;">
                      <a href="${process.env.LIVE_URL}/submit" class="cta-button" style="background-color: #D4AF37; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; border: 1px solid #D4AF37;">Enter Contest Now</a>
                    </p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;"><strong>How to Submit:</strong></p>
                    <ol style="margin: 0 0 20px; padding-left: 20px;">
                      <li>Click the button above or visit <a href="${process.env.LIVE_URL}/submit" style="color: #D4AF37; text-decoration: none;">${process.env.LIVE_URL}/submit</a>.</li>
                      <li>Enter your invitation code: <strong>${values.code}</strong>.</li>
                      <li>Complete the form with your screenplay (PDF, max 20MB) and details.</li>
                      <li>Agree to terms and submit—confirmation will follow instantly.</li>
                    </ol>
                    
                    <p style="margin: 20px 0; line-height: 1.5;"><strong>Key Dates:</strong> Submissions close December 31, 2025. Shortlist notifications in February 2026. Winners announced April 2026.</p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">Explore more about <a href="${process.env.LIVE_URL}/the-prize" style="color: #D4AF37; text-decoration: none;">the prizes</a>, <a href="${process.env.LIVE_URL}/winners" style="color: #D4AF37; text-decoration: none;">past winners</a>, and <a href="${process.env.LIVE_URL}/rules" style="color: #D4AF37; text-decoration: none;">official rules</a>.</p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">Questions? Reply to this email or reach us at <a href="mailto:info@${process.env.URL}" style="color: #D4AF37; text-decoration: none;">info@${process.env.URL}</a>.</p>
                    
                    <p style="margin: 10px 0 0 0; font-style: italic; color: #666;">We can't wait to read your script!</p>
                    <p style="margin: 0; font-style: italic; color: #666;">The Cut to Black Prize Team</p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px 30px; background-color: #000; color: #f8f8f8; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2025 Cut to Black Prize. All rights reserved.</p>
                    <p style="margin: 0;">
                      <a href="${process.env.LIVE_URL}/rules" class="footer-link" style="color: #D4AF37; text-decoration: none;">Official Rules</a> |
                      <a href="${process.env.LIVE_URL}/privacy" class="footer-link" style="color: #D4AF37; text-decoration: none;">Privacy Policy</a> |
                      <a href="${process.env.LIVE_URL}/contact" class="footer-link" style="color: #D4AF37; text-decoration: none;">Contact Us</a>
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
  return data;
};

const sendPaymentVerifiedConfirm = (values: any) => {
  const data = {
    from: process.env.EMAIL_USER,
    to: values.email,
    subject: values.subject,
    html: /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cut to Black Prize Payment Confirmation</title>
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
          .details-table tr:nth-child(even) { background-color: #f9f9f9; }
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
                    <p style="margin: 5px 0 0 0; color: #000; font-size: 14px; font-style: italic;">Payment Verified – Ready to Submit</p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px; background-color: #f8f8f8; color: #333;">
                    <h2 style="margin: 0 0 20px; color: #000; font-size: 20px;">Dear ${
                      values.fullName
                    },</h2>
                    
                    <p style="margin: 0 0 20px;">Excellent news! Your payment has been successfully verified and received by the Cut to Black Prize team. Thank you for your commitment to this exclusive screenwriting competition—your support helps champion emerging voices in the industry.</p>
                    
                    <p style="margin: 0 0 30px;">With payment confirmed, your submission portal is now fully unlocked. Proceed to upload your screenplay and secure your entry in the judging process.</p>
                    
                    <!-- Payment Details Table -->
                    <table role="presentation" class="details-table" style="width: 100%; border-collapse: collapse; background-color: #fff;">
                      <tr style="background-color: #f9f9f9;">
                        <td style="font-weight: bold; width: 40%;">Entry ID:</td>
                        <td>${values.entryId}</td>
                      </tr>
                    
                 
                      <tr>
                        <td style="font-weight: bold;">Verification Date:</td>
                        <td>${new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}</td>
                      </tr>
                      <tr style="background-color: #f9f9f9;">
                        <td style="font-weight: bold;">Status:</td>
                        <td style="color: #28a745; font-weight: bold;">Verified & Processed</td>
                      </tr>
                    </table>
                    
                    <p style="text-align: center; margin: 20px 0;">
                      <a href="${
                        process.env.LIVE_URL
                      }/submit" class="cta-button" style="color:#000;">Upload Your Screenplay Now</a>
                    </p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;"><strong>Next Steps:</strong></p>
                    <ul style="margin: 0 0 20px; padding-left: 20px;">
                      <li>Access your submission portal using your invitation code.</li>
                      <li>Upload your PDF screenplay (max 20MB) and complete the metadata form.</li>
                      <li>Receive instant confirmation—your entry will be anonymized for blind review.</li>
                      <li>Deadline: December 31, 2025. Shortlist by February 2026.</li>
                    </ul>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">For any questions about your payment or submission, reply to this email or contact <a href="mailto:info@${
                      process.env.URL
                    }" style="color: #D4AF37; text-decoration: none;">info@${
      process.env.URL
    }</a>.</p>
                    
                    <p style="margin: 20px 0; line-height: 1.5;">Explore <a href="${
                      process.env.LIVE_URL
                    }/the-prize" style="color: #D4AF37; text-decoration: none;">prize details</a>, <a href="${
      process.env.LIVE_URL
    }/winners" style="color: #D4AF37; text-decoration: none;">past winners</a>, and <a href="${
      process.env.LIVE_URL
    }/rules" style="color: #D4AF37; text-decoration: none;">official rules</a> to prepare your entry.</p>
                    
                    <p style="margin: 10px 0 0 0; font-style: italic; color: #666;">Your investment in storytelling is appreciated.</p>
                    <p style="margin: 0; font-style: italic; color: #666;">The Cut to Black Prize Team</p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px 30px; background-color: #000; color: #f8f8f8; font-size: 14px;">
                    <p style="margin: 0 0 10px;">&copy; 2025 Cut to Black Prize. All rights reserved.</p>
                    <p style="margin: 0;">
                      <a href="${
                        process.env.LIVE_URL
                      }/rules" class="footer-link" style="color:#D4AF37; text-decoration: none;">Official Rules</a> |
                      <a href="${
                        process.env.LIVE_URL
                      }/privacy" class="footer-link" style="color:#D4AF37; text-decoration: none;">Privacy Policy</a> |
                      <a href="${
                        process.env.LIVE_URL
                      }/contact" class="footer-link" style="color:#D4AF37; text-decoration: none;">Contact Us</a>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">This is an automated confirmation. Secure transaction—no further action required.</p>
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
  return data;
};

export const emailTemplate = {
  createAccount,
  resetPassword,
  sendConfirmationEmail,
  sendForgetInviteCodeEmail,
  sendInvitationCode,
  sendPaymentVerifiedConfirm,
};
