import { ArticleModel } from '../models/article.model.js';

export const articleServices = {
    create: async (article) => {
        try {
            const newArticle = new ArticleModel(article);
            await newArticle.save();
            await newArticle.populate('category');
            return newArticle;
        } catch (error) {
            console.log(error);
            throw new Error(`Service Error: ${error.message}`);
        }
    },

    getAll: async () => {
        try {
            const articles = await ArticleModel.find({})
                .populate('category')
                .sort({ createdAt: -1 });
            return articles;
        } catch (error) {
            console.log(error);
            throw new Error(`Service Error: ${error.message}`);
        }
    },

    getArticle: async (id) => {
        try {
            const article = await ArticleModel.findOne({ _id: id }).populate('category');
            if (!article) {
                throw new Error('Article not found');
            }
            return article;
        } catch (error) {
            console.log(error);
            throw new Error(`Service Error: ${error.message}`);
        }
    },

    getArticleBySlug: async (slug) => {
        try {
            const article = await ArticleModel.findOne({ slug: slug }).populate('category');
            if (!article) {
                throw new Error('Article not found');
            }
            return article;
        } catch (error) {
            console.log(error);
            throw new Error(`Service Error: ${error.message}`);
        }
    },

    getArticlesByCategory: async (categoryId) => {
        try {
            const articles = await ArticleModel.find({ category: categoryId })
                .populate('category')
                .sort({ createdAt: -1 });
            return articles;
        } catch (error) {
            console.log(error);
            throw new Error(`Service Error: ${error.message}`);
        }
    },

    updateArticle: async (id, updateData) => {
        try {
            const article = await ArticleModel.findByIdAndUpdate(
                id, 
                updateData,
                { new: true, runValidators: true }
            ).populate('category');
            
            if (!article) {
                throw new Error('Article not found');
            }
            return article;
        } catch (error) {
            console.log(error);
            throw new Error(`Service Error: ${error.message}`);
        }
    },

    deleteArticle: async (id) => {
        try {
            const article = await ArticleModel.findByIdAndDelete(id);
            if (!article) {
                throw new Error('Article not found');
            }
            return article;
        } catch (error) {
            console.log(error);
            throw new Error(`Service Error: ${error.message}`);
        }
    }
};