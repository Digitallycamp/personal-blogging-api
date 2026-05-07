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
