import express from 'express';
import { 
	catController, 
	getAllCategoriesController,
	getCategoryController,
	updateCategoryController,
	deleteCategoryController
} from '../controllers/cat.controller.js';

export const catRoute = express.Router();

catRoute.post('/new-cat', catController);

catRoute.get('/', getAllCategoriesController);

catRoute.get('/:id', getCategoryController);

catRoute.patch('/:id', updateCategoryController);

catRoute.delete('/:id', deleteCategoryController);