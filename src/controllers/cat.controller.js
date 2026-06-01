import { StatusCodes } from 'http-status-codes';
import { catServices } from '../repositories/cat.repository.js';


export const catController = async (req, res) => {
	const { name } = req.body;
	console.log(name);
	try {
		if (!name) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ status: false, message: 'Fields can not be empty' });
		}

		const newData = await catServices.create({ name });

		return res.status(StatusCodes.CREATED).json({
			status: true,
			message: 'Category created successfully!',
			data: newData,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};


export const getAllCategoriesController = async (req, res) => {
	try {
		const categories = await catServices.getAll();
		
		return res.status(StatusCodes.OK).json({
			status: true,
			message: 'Categories retrieved successfully!',
			data: categories,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};


export const getCategoryController = async (req, res) => {
	const { id } = req.params;
	
	try {
		const category = await catServices.getById(id);
		
		return res.status(StatusCodes.OK).json({
			status: true,
			message: 'Category retrieved successfully!',
			data: category,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};


export const updateCategoryController = async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	
	try {
		if (!name) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				status: false,
				message: 'Category name is required'
			});
		}
		
		const updatedCategory = await catServices.update(id, { name });
		
		return res.status(StatusCodes.OK).json({
			status: true,
			message: 'Category updated successfully!',
			data: updatedCategory,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};


export const deleteCategoryController = async (req, res) => {
	const { id } = req.params;
	
	try {
		await catServices.delete(id);
		
		return res.status(StatusCodes.OK).json({
			status: true,
			message: 'Category deleted successfully!',
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};