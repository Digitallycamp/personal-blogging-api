import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/database.js';
dotenv.config();

export const PORT = process.env.PORT || 8000;

export const app = express();

const startServer = async () => {
	await connectDB(process.env.DB_URL);
	app.listen(PORT, () => {
		console.log(
			`sERVER RUNIMNG ON http://localhost:${process.env.PORT || 5001}`
		);
	});
};

startServer();
