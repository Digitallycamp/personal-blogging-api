import { erroMiddleware } from './middleware/error.middleware.js';
import { app } from './app.js';
import express from 'express';
import session from 'express-session';
import { MongoStore } from 'connect-mongo';
import { aboutRouter } from './routes/aboutme.routes.js';
import { catRoute } from './routes/cat.routes.js';
import { connectDB } from './db/database.js';

import helmet from 'helmet';
import cors from 'cors';
import { articleRoutes } from './routes/article.routes.js';
import { newsletterRouter } from './routes/newsletter.routes.js';
import { authRouter } from './routes/auth.routes.js';
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
		origin: process.env.FRONTEND_URL || 'http://localhost:5173',
		credentials: true,
		methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
		preflightContinue: false,
		optionsSuccessStatus: 204,
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);
app.use(helmet());
// app.use('/api/inngest', serve(inngest, [sendNewsletterJob]));

app.use(
  session({
    name: 'personal_blog_session',
    secret: process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      ttl: 24 * 60 * 60, 
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: 'lax',
      path: '/',
    },
  })
);

app.get('/', (req, res) => {
	res.send('Hellow express');
});

app.use('/api/v1/auth', authRouter);
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
