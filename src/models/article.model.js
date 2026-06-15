import { Schema, model, ObjectId } from 'mongoose';

const articleSchema = Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	slug: {
		type: String,
		sparse: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	description: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	featuredImage: {
		type: String,
		default: ''
	},
	category: { 
		type: ObjectId, 
		ref: 'Cat',
		required: true
	},
	tags: [{
		type: String,
		trim: true
	}],
	author: {
		type: String,
		default: 'Admin'
	},
	viewCount: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true
});



export const ArticleModel = model('Article', articleSchema);