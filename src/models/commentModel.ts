import CommentSchema from '@schema/commentSchema';
import { InferSchemaType, model } from 'mongoose';

export type TComment = InferSchemaType<typeof CommentSchema>;

const Comment = model('Comment', CommentSchema);
export default Comment;

export const createBlogComment = (values: Partial<TComment>) =>
	new Comment(values).save().then((comment) => comment.toObject());

export const findAllComments = () => Comment.find();

export const findCommentsByBlogId = (blogId: string) =>
	Comment.find({ blogId: blogId });

export const findCommentsByParentCommentId = (parentCommentId: string) =>
	Comment.find({ parentCommentId: parentCommentId });

export const findCommentById = (commentId: string) =>
	Comment.findById(commentId);

export const updateCommentById = (
	commentId: string,
	values: Partial<TComment>
) => Comment.findByIdAndUpdate(commentId, { $set: values }, { new: true });

export const deleteCommentById = (commentId: string) =>
	Comment.findByIdAndDelete(commentId);
