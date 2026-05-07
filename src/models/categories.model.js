import { Schema, model } from 'mongoose';

const catSchema = Schema({
	name: String,
});

export const CatModel = model('Cat', catSchema);
