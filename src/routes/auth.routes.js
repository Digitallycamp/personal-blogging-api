import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { auth } from '../middleware/auth.middleware.js';

export const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', auth, authController.getMe);

authRouter.post('/google', authController.googleLogin);

authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/reset-password', authController.resetPassword);