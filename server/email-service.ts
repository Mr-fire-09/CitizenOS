import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-app-password",
  },
});

export async function sendEmailOTP(email: string, otp: string, purpose: string): Promise<boolean> {
  try {
    const subject = purpose === "login" 
      ? "Your Login OTP - Digital Governance Platform" 
      : "Your Registration OTP - Digital Governance Platform";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a237e;">Digital Governance Platform</h2>
        <p>Your ${purpose} OTP is:</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
          <h1 style="color: #1a237e; letter-spacing: 5px; font-family: monospace;">${otp}</h1>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p style="color: #666; font-size: 12px;">If you didn't request this OTP, please ignore this email.</p>
      </div>
    `;

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER || "noreply@governance.gov",
      to: email,
      subject,
      html: htmlContent,
    });

    console.log(`Email OTP sent to ${email}: ${result.messageId}`);
    return true;
  } catch (error) {
    console.error(`Failed to send email OTP to ${email}:`, error);
    return false;
  }
}
