import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, category, message } = await req.json();

  if (!name || !email || !category || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SOCUKAI.MY Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${category}`,
      text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\nMessage: ${message}`,
      html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body style='background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:37.5em;background-color:#ffffff;margin:0 auto;padding:20px 0 48px;margin-bottom:64px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:0 48px">
              <tbody>
                <tr>
                  <td>
                    <img alt="SOCUKAI.MY" height="32" src="./logo.svg" style="display:block;outline:none;border:none;text-decoration:none;margin-bottom:12px" width="120" />
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
                    <h2 style="font-size:20px;line-height:28px;color:#0e1a2b;text-align:left;margin-top:16px;margin-bottom:16px">New Contact Form Submission</h2>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px">
                      <tr>
                        <td style="font-weight:bold;color:#525f7f;padding:8px 0;width:120px">Name:</td>
                        <td style="color:#525f7f;padding:8px 0">${name}</td>
                      </tr>
                      <tr>
                        <td style="font-weight:bold;color:#525f7f;padding:8px 0;width:120px">Email:</td>
                        <td style="color:#525f7f;padding:8px 0">${email}</td>
                      </tr>
                      <tr>
                        <td style="font-weight:bold;color:#525f7f;padding:8px 0;width:120px">Category:</td>
                        <td style="color:#525f7f;padding:8px 0">${category}</td>
                      </tr>
                      <tr>
                        <td style="font-weight:bold;color:#525f7f;padding:8px 0;width:120px;vertical-align:top">Message:</td>
                        <td style="color:#525f7f;padding:8px 0;white-space:pre-line">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')}</td>
                      </tr>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
                    <p style="font-size:12px;line-height:16px;color:#8898aa;margin-top:16px;margin-bottom:16px;text-align:center">
                      &copy; ${new Date().getFullYear()} SOCUKAI.MY
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Nodemailer error:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
} 