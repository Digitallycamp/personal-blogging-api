import express from 'express';
import {
	createArticleController,
	getAllArticlesController,
	getArticleController,
	getArticleBySlugController,
	getArticlesByCategoryController,
	updateArticleController,
	deleteArticleController
} from '../controllers/article.controller.js';

import { auth } from '../middleware/auth.middleware.js';

export const articleRoutes = express.Router();


articleRoutes.get('/', getAllArticlesController);
articleRoutes.get('/slug/:slug', getArticleBySlugController);
articleRoutes.get('/category/:categoryId', getArticlesByCategoryController);
articleRoutes.get('/:id', getArticleController);

articleRoutes.post('/', auth, createArticleController);
articleRoutes.patch('/:id', auth, updateArticleController);
articleRoutes.delete('/:id', auth, deleteArticleController);