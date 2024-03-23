import CommentSchema from '@schema/commentSchema';
import { InferSchemaType, model } from 'mongoose';

export type TComment = InferSchemaType<typeof CommentSchema>;

const Comment = model('Comment', CommentSchema);
export default Comment;

export const findAllComments = () => Comment.find();

export const findCommentsByBlogId = (blogId: string) =>
	Comment.find({ parentCommentId: null, blogId: blogId }).populate('replies');

export const findRepliesByCommentId = (commentId: string) =>
	Comment.find({ parentCommentId: commentId }).populate('replies');

export const findCommentsByUserId = (userId: string) =>
	Comment.find({ userId: userId });

export const findCommentById = (commentId: string) =>
	Comment.findById(commentId);

export const createComment = (values: Partial<TComment>) =>
	new Comment(values).save().then((comment) => comment.toObject());

export const updateCommentById = (
	commentId: string,
	values: Partial<TComment>
) => Comment.findByIdAndUpdate(commentId, { $set: values }, { new: true });

export const deleteCommentById = (commentId: string) =>
	Comment.findByIdAndDelete(commentId);
