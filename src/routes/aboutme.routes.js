import express from 'express';
import {
	createAboutMe,
	deleteData,
	getData,
} from '../controllers/about.controller.js';

export const aboutRouter = express.Router();

aboutRouter.get('/', getData);
aboutRouter.patch('/create', createAboutMe);
aboutRouter.delete('/remove/:email', deleteData);
