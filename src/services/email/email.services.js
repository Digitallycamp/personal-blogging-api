import nodemailer from 'nodemailer';

// recipeint, subject, template;

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
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
			await transporter.verify();
			console.log('Server is ready to take our messages');
			const info = await transporter.sendMail({
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
