import { StatusCodes } from 'http-status-codes';
import { aboutServices } from '../repositories/aboutme.respositories.js';

export const createAboutMe = async (req, res) => {
	const { name, bio, email, socials } = req.body;

	try {
		if (!name || !bio || !email || socials.length === 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				sucess: false,
				status: StatusCodes.BAD_REQUEST,
				message: 'All fields are required',
			});
		}

		const newAboutme = await aboutServices.create({
			name,
			bio,
			email,
			socials,
		});

		return res.status(StatusCodes.CREATED).json({
			sucess: true,
			status: StatusCodes.CREATED,
			message: 'About Me created successfully',
			data: newAboutme,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			sucess: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};

export const deleteData = async (req, res) => {
	console.log('hshhs', req.body);
	const { email } = req.params;
	try {
		if (!email) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				sucess: false,
				status: StatusCodes.BAD_REQUEST,
				message: 'All fields are required',
			});
		}
		await aboutServices.delete(email);
		return res.status(StatusCodes.ACCEPTED).json({
			sucess: true,
			status: StatusCodes.ACCEPTED,
			message: 'About Me deleted successfully',
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			sucess: false,
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};
