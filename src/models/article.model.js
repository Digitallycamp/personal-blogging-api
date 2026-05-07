import { Schema, model, ObjectId } from 'mongoose';

const articleSchema = Schema({
	title: String,
	description: String,
	category: { type: ObjectId, ref: 'Cat' },
});

export const ArticleModel = model('Article', articleSchema);
