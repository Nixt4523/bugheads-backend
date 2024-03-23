import { Schema } from 'mongoose';

const CommentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		blogId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Blog',
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		parentCommentId: {
			type: Schema.Types.ObjectId,
			default: null,
			ref: 'Comment',
		},
		replies: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true }
);

export default CommentSchema;
