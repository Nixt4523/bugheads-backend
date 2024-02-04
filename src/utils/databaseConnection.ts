import mongoose from 'mongoose';

const databaseConnection = () => {
	const MONGODB_URI = process.env.MONGODB_URI as string;

	return mongoose.connect(MONGODB_URI);
};

export default databaseConnection;
