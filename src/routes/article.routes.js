import express from 'express';
import {
	articleController,
	getAllArticleController,
	getArticleController,
	updateArticleController,
	deleteArticleController,
} from '../controllers/article.controller.js';

export const articleRoutes = express.Router();

articleRoutes.get('/', getAllArticleController);
articleRoutes.get('/new/:id', getArticleController);
articleRoutes.post('/new', articleController);
articleRoutes.patch('/new/:id', updateArticleController);
articleRoutes.delete('/new/:id', deleteArticleController);
