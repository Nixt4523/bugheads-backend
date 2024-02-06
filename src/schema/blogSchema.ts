import { Schema } from 'mongoose';

const BlogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
		tags: [
			{
				type: String,
			},
		],
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default BlogSchema;