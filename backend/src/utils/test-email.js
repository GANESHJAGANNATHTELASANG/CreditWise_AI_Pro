import "dotenv/config";

import transporter from "../config/mail.js";

const testEmail = async () => {
  try {
    await transporter.verify();

    console.log("SMTP connection is working");

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_USER,
      subject: "CreditWise AI - Email Test",
      text: "Your CreditWise AI email system is working.",
      html: `
                <h2>CreditWise AI</h2>
                <p>Your email system is working successfully.</p>
            `,
    });

    console.log("Test email sent:", info.messageId);
  } catch (error) {
    console.error("Email test failed:", error);
  }
};

testEmail();
