import { NewsLetterModel } from '../models/newsletter.model.js';
import { emailService } from '../services/email/email.services.js';
import { newsLetterWelcome } from '../services/email/templates/emails.templates.js';

export const newsletterServices = {
	create: async (payload) => {
		try {
			const existingSubscriber = await NewsLetterModel.findOne({
				email: payload.email,
			});

			if (existingSubscriber) {
				if (!existingSubscriber.isActive) {
					existingSubscriber.isActive = true;
					existingSubscriber.name = payload.name;
					await existingSubscriber.save();
					return existingSubscriber;
				}
				throw new Error('Email already subscribed to newsletter');
			}

			const subscriber = new NewsLetterModel({
				name: payload.name,
				email: payload.email,
				subscribedAt: new Date(),
			});

			await subscriber.save();
			// send a welcome email
			await emailService.sendNewsLetterWelcomeEmail(
				subscriber.email,
				newsLetterWelcome.replaceAll('{{name}}', subscriber.name)
			);
		} catch (error) {
			console.log(error);
			throw new Error(`Service Error`, error.message);
		}
	},
	update: async (email) => {
		console.log(email);
		try {
			const subscriber = await NewsLetterModel.findOneAndUpdate(
				{ email: email.toLowerCase() },
				{ isActive: false },
				{ new: true }
			);

			if (!subscriber) {
				throw new Error('Subscriber not found');
			}

			return subscriber;
		} catch (error) {
			throw new Error(`Service Error`, error.message);
		}
	},
	delete: async (email) => {
		try {
			const subscriber = await NewsLetterModel.findOneAndDelete({
				email: email.toLowerCase(),
			});

			if (!subscriber) {
				throw new Error('Subscriber not found');
			}

			return subscriber;
		} catch (error) {
			throw new Error(`Service Error: ${error.message}`);
		}
	},
};
