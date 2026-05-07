import { StatusCodes } from 'http-status-codes';

export const erroMiddleware = (err, req, res, next) => {
	console.error(err);
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		success: false,
		statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
		message: 'Something broke',
		data: {},
	});

	next();
};
