import express from 'express';
import {catController,getCategoriesController} from '../controllers/cat.controller.js';

export const catRoute = express.Router();

catRoute.post('/new-cat', catController);
catRoute.get('/', getCategoriesController);
