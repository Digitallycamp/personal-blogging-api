import mongoose from 'mongoose';

mongoose.connection.on('error', (err) => {
	console.error('Mongoose connection ❌', err);
});
mongoose.connection.on('disconnected', () => {
	console.error('Mongoose disconnected 💥');
});
mongoose.connection.on('connected', () => {
	console.error('Mongoose connected successfully✔️ ');
});
export const connectDB = async (url) => {
	try {
		await mongoose.connect(url);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
