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

export const articleRoutes = express.Router();


articleRoutes.get('/', getAllArticlesController);
articleRoutes.get('/slug/:slug', getArticleBySlugController);
articleRoutes.get('/category/:categoryId', getArticlesByCategoryController);
articleRoutes.get('/:id', getArticleController);
articleRoutes.post('/', createArticleController);
articleRoutes.patch('/:id', updateArticleController);
articleRoutes.delete('/:id', deleteArticleController);