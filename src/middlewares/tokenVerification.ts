import { verifyAuthToken } from '@managers/tokenManager';
import { NextFunction, Request, Response } from 'express';

export const verifyUserToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeaders = req.headers.token;

	if (!authHeaders) {
		return res.status(401).json('NOT AUTHENTICATED');
	}

	const userAuthToken = authHeaders.toString().split(' ')[1];
	const user = verifyAuthToken(userAuthToken);

	if (!user) {
		return res.status(403).json('INVALID TOKEN');
	}

	req.user = user;
	next();
};

export const verifyUserTokenAndAuthorization = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	verifyUserToken(req, res, () => {
		if (req.user.id == req.params.userId || req.user.isAdmin) {
			next();
		} else {
			return res.status(403).json('UNAUTHORIZED USER');
		}
	});
};

export const verifyUserTokenAndAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	verifyUserToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			return res.status(403).json('UNAUTHORIZED ADMIN');
		}
	});
};
