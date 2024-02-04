import { NextFunction, Request, Response } from 'express';

export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(`REQUEST : METHOD ${req.method} URL ${req.url}`);
	next();
};

export const responseLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(`RESPONSE : STATUS ${res.statusCode} URL ${req.url}`);
	next();
};
