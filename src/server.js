import { erroMiddleware } from './middleware/error.middleware.js';
import { app } from './app.js';
import express from 'express';
import { aboutRouter } from './routes/aboutme.routes.js';
import { catRoute } from './routes/cat.routes.js';
import { connectDB } from './db/database.js';

import helmet from 'helmet';
import cors from 'cors';
import { articleRoutes } from './routes/article.routes.js';
import { newsletterRouter } from './routes/newsletter.routes.js';
// import { serve } from 'inngest/express';
// import inngest from './inngest/client.js';
// import { sendNewsletterJob } from './jobs/sendNewsletter.job.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: '*',
		methods: 'GET,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);
app.use(helmet());
// app.use('/api/inngest', serve(inngest, [sendNewsletterJob]));
app.get('/', (req, res) => {
	res.send('Hellow express');
});

app.use('/api/v1/aboutme', aboutRouter);
app.use('/api/v1/article', articleRoutes);
app.use('/api/v1/cat', catRoute);
app.use('/api/v1/newsletter', newsletterRouter);
// add server here

const startServer = async () => {
	await connectDB(process.env.DB_URL);

	app.listen(PORT, () => {
		console.log(
			`sERVER RUNIMNG ON http://localhost:${process.env.PORT || 5001}`
		);
	});
};

startServer();
app.use(erroMiddleware);
