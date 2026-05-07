import express from 'express';
import { getProducts } from '../controllers/product.controller.js';

export const productRouter = express.Router();

productRouter.get('/', getProducts);
