import CryptoJS from 'crypto-js';

export const encryptPassword = (password: string) => {
	return CryptoJS.AES.encrypt(
		password,
		process.env.CRYPTOJS_SECRET as string
	).toString();
};

export const decryptPassword = (password: string) => {
	return CryptoJS.AES.decrypt(
		password,
		process.env.CRYPTOJS_SECRET as string
	).toString(CryptoJS.enc.Utf8);
};