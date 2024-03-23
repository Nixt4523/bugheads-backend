import { Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		bio: {
			type: String,
			default: '',
		},
		profilePicture: {
			type: String,
			default: '',
		},
		bookmarkedBlogs: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Blog',
			},
		],
		isVerified: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default UserSchema;
