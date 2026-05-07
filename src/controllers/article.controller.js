import { StatusCodes } from 'http-status-codes';
import { articleServices } from '../repositories/article.repositories.js';

export const articleController = async (req, res) => {
	const { title, description, category } = req.body;
	console.log(req.body);
	try {
		if (!title || !category || !description) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ status: false, message: 'Fields can not be empty' });
		}

		const newData = await articleServices.create({
			title,
			category,
			description,
		});

		return res.status(StatusCodes.CREATED).json({
			status: true,
			message: 'Arrticle created succesfully!',
			data: newData,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			sucess: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};

export const getAllArticleController = async (req, res) => {
	try {
		const articles = await articleServices.getAll();

		return res.status(StatusCodes.OK).json({
			status: true,
			message: 'Arrticles retrived succesfully!',
			data: articles,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			sucess: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};
export const getArticleController = async (req, res) => {
	const id = req.params.id;
	try {
		// db here
		const article = await articleServices.getArticle(id);
		return res.status(StatusCodes.OK).json({
			status: true,
			message: 'Article retrived succesfully!',
			data: article,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			sucess: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};
export const updateArticleController = async (req, res) => {
	const id = req.params.id;
	try {
		// tal top db
		const article = await articleServices.updateArticle(id);
		return res.status(StatusCodes.CREATED).json({
			status: true,
			message: 'Arrticle updated succesfully!',
			data: article,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			sucess: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};
export const deleteArticleController = async (req, res) => {
	const id = req.params.id;
	try {
		// tal top db
		await articleServices.deleteArticle(id);
		return res.status(StatusCodes.CREATED).json({
			status: true,
			message: 'Arrticle deleted succesfully!',
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			sucess: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};
