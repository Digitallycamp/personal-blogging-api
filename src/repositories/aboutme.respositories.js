import { AboutModel } from '../models/aboutme.model.js';

export const aboutServices = {
	create: async (payload) => {
		try {
			const about = await AboutModel.findOneAndUpdate(
				{ email: payload.email },
				payload,
				{ upsert: true, returnDocument: 'after' }
			);

			return about;
		} catch (error) {
			throw new Error(`Service Error`, error.message);
		}
	},
	delete: async (email) => {
		console.log(email);
		try {
			const aboutData = await AboutModel.findOneAndDelete({
				email: email,
			});
			if (!aboutData) {
				throw new Error('About details not found');
			}

			return aboutData;
		} catch (error) {
			throw new Error(`Service Error`, error.message);
		}
	},
};
