import { Schema, model } from 'mongoose';

const catSchema = Schema({
	name: {
		type: String,
		required: true,
		trim: true
	}
}, {
	timestamps: true 
});

export const CatModel = model('Cat', catSchema);