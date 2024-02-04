import UserSchema from '@schema/userSchema';
import { InferSchemaType, model } from 'mongoose';

export type TUser = InferSchemaType<typeof UserSchema>;

const User = model<TUser>('User', UserSchema);
export default User;

export const findAllUsers = () => User.find();

export const findUserByEmail = (email: string) =>
	User.findOne({ email }).select('+password');

export const findUserById = (userId: string) => User.findById(userId);

export const createUser = (values: Partial<TUser>) =>
	new User(values).save().then((user) => user.toObject());

export const updateUserById = (userId: String, values: Partial<TUser>) =>
	User.findByIdAndUpdate(userId, { $set: values }, { new: true });

export const deleteUserById = (userId: string) =>
	User.findByIdAndDelete(userId);
