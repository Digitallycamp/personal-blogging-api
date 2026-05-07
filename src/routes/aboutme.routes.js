import express from 'express';
import { createAboutMe, deleteData } from '../controllers/about.controller.js';

export const aboutRouter = express.Router();

aboutRouter.post('/create', createAboutMe);
aboutRouter.delete('/remove/:email', deleteData);
