import express from 'express';
import { catController } from '../controllers/cat.controller.js';

export const catRoute = express.Router();

catRoute.post('/new-cat', catController);
