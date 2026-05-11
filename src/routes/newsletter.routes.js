import express from 'express';
import { createNewsletter, updateNewsletter, unsubscribeNewsletter } from '../controllers/newsletter.controller.js';

export const newsletterRouter  = express.Router();

newsletterRouter.post('/subscribe', createNewsletter);
newsletterRouter.patch('/update/:email', updateNewsletter)
newsletterRouter.delete('/unsubscribe/:email', unsubscribeNewsletter);
