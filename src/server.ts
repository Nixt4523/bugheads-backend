import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import 'module-alias/register';

import authRoutes from '@routes/authRoutes';
import blogRoutes from '@routes/blogRoutes';
import commentRoutes from '@routes/commentRoutes';
import userRoutes from '@routes/userRoutes';

import { logger, requestLogger, responseLogger } from '@middlewares/logger';
import rateLimiter from '@middlewares/rateLimiter';

import databaseConnection from '@utils/databaseConnection';

const app: Express = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(helmet());

app.use(rateLimiter);
app.use(requestLogger);
app.use(responseLogger);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, () => {
	databaseConnection()
		.then(() => {
			logger.info('[DB CONNECTION] : Connected');
			logger.info(`[SERVER] : http://localhost:${PORT}`);
		})
		.catch((error) => {
			logger.error(`[ERROR] : ${error}`);
			process.exit(1);
		});
});
