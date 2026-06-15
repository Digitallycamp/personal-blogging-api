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

		// todo add cat
		const newData = await catServices.create({ name });

		return res.status(StatusCodes.CREATED).json({
			status: true,
			message: 'Category created succesfully!',
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


export const getCategoriesController = async (req, res) => {
	try {
		const categories = await catServices.getAll();

		return res.status(StatusCodes.OK).json({
			success: true,
			data: categories,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message,
		});
	}
};