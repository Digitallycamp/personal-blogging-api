import mongoose from 'mongoose';

export const newLetterSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		subscribedAt: {
			type: Date,
			default: Date.now,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

export const NewsLetterModel = mongoose.model('NewsLetter', newLetterSchema);
