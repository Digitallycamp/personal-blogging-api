import { StatusCodes } from 'http-status-codes';
import { articleServices } from '../repositories/article.repositories.js';

export const createArticleController = async (req, res) => {
	const { title, description, content, category, tags, featuredImage, author } = req.body;
	
	try {
		if (!title || !category || !description || !content) {
			return res.status(StatusCodes.BAD_REQUEST).json({ 
				success: false, 
				message: 'Title, category, description and content are required' 
			});
		}

		const newArticle = await articleServices.create({
			title,
			category,
			description,
			content,
			tags: tags || [],
			featuredImage: featuredImage || '',
			author: author || 'Admin'
		});

		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: 'Article created successfully!',
			data: newArticle,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message,
		});
	}
};

export const getAllArticlesController = async (req, res) => {
	try {
		const articles = await articleServices.getAll();
		
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Articles retrieved successfully!',
			count: articles.length,
			data: articles,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message,
		});
	}
};

export const getArticleController = async (req, res) => {
	const { id } = req.params;
	
	try {
		const article = await articleServices.getArticle(id);
		
		
		if (article) {
			article.viewCount += 1;
			await article.save();
		}
		
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Article retrieved successfully!',
			data: article,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message,
		});
	}
};

export const getArticleBySlugController = async (req, res) => {
	const { slug } = req.params;
	
	try {
		const article = await articleServices.getArticleBySlug(slug);
		
		
		if (article) {
			article.viewCount += 1;
			await article.save();
		}
		
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Article retrieved successfully!',
			data: article,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message,
		});
	}
};

export const getArticlesByCategoryController = async (req, res) => {
	const { categoryId } = req.params;
	
	try {
		const articles = await articleServices.getArticlesByCategory(categoryId);
		
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Articles retrieved successfully!',
			count: articles.length,
			data: articles,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message,
		});
	}
};

export const updateArticleController = async (req, res) => {
	const { id } = req.params;
	const updateData = req.body;
	
	try {
		const article = await articleServices.updateArticle(id, updateData);
		
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Article updated successfully!',
			data: article,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message,
		});
	}
};

export const deleteArticleController = async (req, res) => {
	const { id } = req.params;
	
	try {
		await articleServices.deleteArticle(id);
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Article deleted successfully!',
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message,
		});
	}
};