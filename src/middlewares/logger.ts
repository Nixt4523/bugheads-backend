import { NextFunction, Request, Response } from 'express';
import winston from 'winston';

export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(
			(info) => `${info.timestamp} ${info.level.toUpperCase()} ${info.message}`
		),
		winston.format.cli()
	),
	transports: [new winston.transports.Console()],
});

export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.info(`[REQUEST] : ${req.method} ${req.url}`);
	next();
};

export const responseLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.info(`[RESPONSE] : ${res.statusCode} ${req.url}`);
	next();
};
