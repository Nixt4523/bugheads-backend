import jwt from 'jsonwebtoken';

export const createAuthToken = (values: Record<string, any>) => {
	return jwt.sign(values, process.env.JWT_SECRET as string, {
		expiresIn: '1d',
	});
};

export const verifyAuthToken = (token: string) => {
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET as string);
		return user;
	} catch (error) {
		return;
	}
};