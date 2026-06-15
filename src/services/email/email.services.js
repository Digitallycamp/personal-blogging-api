import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendResetPasswordEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: `"Your Blog" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr>
        <p style="font-size: 12px; color: #666;">Your Blog Team</p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

// recipeint, subject, template;

// Create a transporterSMTP using SMTP
const transporterSMTP = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export const emailService = {
	sendNewsLetterWelcomeEmail: async (to, template) => {
		try {
			await transporterSMTP.verify();
			console.log('Server is ready to take our messages');
			const info = await transporterSMTP.sendMail({
				from: "Mr Wisdom's Tech update <crytechcrytech@gmail.com>",
				to: to,
				subject: 'Welcome to my tech blog',
				html: template,
			});

			console.log('Message sent: %s', info.messageId);
		} catch (error) {
			console.error('Verification failed:', error);
		}
	},
};
