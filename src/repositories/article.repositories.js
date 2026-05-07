import { ArticleModel } from '../models/article.model.js';

export const articleServices = {
	create: async (article) => {
		try {
			const newArticle = new ArticleModel(article);
			await newArticle.save();

			return newArticle;
		} catch (error) {
			console.log(error);
			throw new Error(`Service Error`, error.message);
		}
	},

	getAll: async () => {
		try {
			const articles = await ArticleModel.find({});

			return articles;
		} catch (error) {
			console.log(error);
			throw new Error(`Service Error`, error.message);
		}
	},
	getArticle: async (id) => {
		try {
			const isArticle = await ArticleModel.findOne({ _id: id });
			if (!isArticle) {
				throw new Error('Article not found');
			}
			return isArticle;
		} catch (error) {
			console.log(error);
			throw new Error(`Service Error`, error.message);
		}
	},
	updateArticle: async (id) => {
		try {
			const isArticle = await ArticleModel.findOneAndUpdate({ _id: id });
			if (!isArticle) {
				throw new Error('Article not found');
			}
			return isArticle;
		} catch (error) {
			console.log(error);
			throw new Error(`Service Error`, error.message);
		}
	},
	deleteArticle: async (id) => {
		try {
			const isArticle = await ArticleModel.findOneAndDelete({ _id: id });
			if (!isArticle) {
				throw new Error('Article not found');
			}
			return isArticle;
		} catch (error) {
			console.log(error);
			throw new Error(`Service Error`, error.message);
		}
	},
};
