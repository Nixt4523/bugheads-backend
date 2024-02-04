import { decryptPassword, encryptPassword } from '@managers/passwordManager';
import {
	TUser,
	deleteUserById,
	findUserByEmail,
	findUserById,
	updateUserById,
} from '@models/userModel';
import { Request, Response } from 'express';

export const updateUserDetails = async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const updatedDetails: TUser = req.body;

	try {
		const existingUser = await findUserById(userId);
		if (!existingUser) {
			return res.status(404).json('USER DOES NOT EXISTS');
		}

		const user = await updateUserById(userId, updatedDetails);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const updateUserPassword = async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const { password, newPassword } = req.body;

	try {
		let user = await findUserById(userId);
		if (!user) {
			return res.status(404).json('USER DOES NOT EXISTS');
		}

		user = await findUserByEmail(user.email);

		const originalPassword = decryptPassword(user!.password);
		if (originalPassword == password) {
			await updateUserById(user!._id.toString(), {
				password: encryptPassword(newPassword),
			});

			const { password, ...otherDetails } = user!.toObject();

			return res.status(200).json({ ...otherDetails });
		} else {
			return res.status(403).json('WRONG CREDENTIALS');
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const userId = req.params.userId;
	try {
		await deleteUserById(userId);

		return res.status(200).json('USER DELETED');
	} catch (error) {
		return res.status(500).json(error);
	}
};
