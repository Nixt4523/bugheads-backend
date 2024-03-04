import { decryptPassword, encryptPassword } from '@managers/passwordManager';
import { createAuthToken } from '@managers/tokenManager';
import { logger } from '@middlewares/logger';
import { createUser, findUserByEmail } from '@models/userModel';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
	let { fullName, email, password } = req.body;

	try {
		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return res.status(403).json('USER ALREADY EXISTS');
		}

		await createUser({
			fullName,
			email,
			password: encryptPassword(password),
		});

		return res.status(201).json('REGISTERED SUCCESSFULLY');
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const login = async (req: Request, res: Response) => {
	let { email, password } = req.body;

	try {
		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(404).json('USER DOES NOT EXISTS');
		}

		const userPassword = decryptPassword(user.password);
		if (userPassword != password) {
			return res.status(401).json('WRONG CREDENTIALS');
		}
		const accessToken = createAuthToken({
			id: user._id,
			isAdmin: user.isAdmin,
		});

		const { password: pass, ...otherDetails } = user.toObject();

		res.cookie('accessToken', accessToken);
		return res.status(200).json({ ...otherDetails });
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const logout = async (req: Request, res: Response) => {
	return res
		.clearCookie('accessToken')
		.status(200)
		.json('SUCCESSFULLY LOGGED OUT');
};
