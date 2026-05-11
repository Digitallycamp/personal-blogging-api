import { StatusCodes } from 'http-status-codes';
import { newsletterServices } from '../repositories/newsletter.respositories.js';

export const createNewsletter = async (req, res) => {
    const { name, email } = req.body;

    try {
        if (!name || !email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                status: StatusCodes.BAD_REQUEST,
                message: 'All fields are required',
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: 'Please provide a valid email address',
            });
        }

        const newSubscriber = await newsletterServices.create({
            name,
            email,
        });

        return res.status(StatusCodes.CREATED).json({
            sucess: true,
            status: StatusCodes.CREATED,
            message: 'Successfully subscribed to newsletter',
            data: newSubscriber,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            sucess: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

export const updateNewsletter = async (req, res) => {
    const { email } = req.params;
    
    try {
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: 'Email is required',
            });
        }
        
        await newsletterServices.update(email);
        
        return res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            message: 'Successfully updated newsletter',
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

export const unsubscribeNewsletter = async (req, res) => {
    const { email } = req.params;
    
    try {
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: 'Email is required',
            });
        }
        
        await newsletterServices.delete(email);
        
        return res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            message: 'Successfully unsubscribed from newsletter',
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

