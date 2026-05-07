import mongoose from 'mongoose';

const aboutSchema = mongoose.Schema({
	name: String,
	bio: String,
	email: String,
	socials: [],
});

export const AboutModel = mongoose.model('About', aboutSchema);
