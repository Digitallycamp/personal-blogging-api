import mongoose from 'mongoose';

export const newLetterSchema = mongoose.Schema({
	name: String,
	email: String,
});

export const NewLetterModel = mongoose.model('NewsLetter', newLetterSchema);
