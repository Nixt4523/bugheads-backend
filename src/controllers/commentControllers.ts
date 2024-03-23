import { logger } from '@middlewares/logger';
import { findBlogById, updateBlogById } from '@models/blogModel';
import {
	TComment,
	createComment,
	deleteCommentById,
	findAllComments,
	findCommentById,
	findCommentsByBlogId,
	findCommentsByUserId,
	findRepliesByCommentId,
	updateCommentById,
} from '@models/commentModel';
import { findUserById } from '@models/userModel';
import { Request, Response } from 'express';

export const getAllComments = async (req: Request, res: Response) => {
	try {
		const comments = await findAllComments();
		return res.status(200).json(comments);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const getCommentById = async (req: Request, res: Response) => {
	const commentId = req.params.commentId;

	try {
		const comment = await findCommentById(commentId);
		if (!comment) {
			return res.status(404).json('COMMENT NOT FOUND');
		}

		return res.status(200).json(comment);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const getCommentsByBlogId = async (req: Request, res: Response) => {
	const blogId = req.params.blogId;
	try {
		const existingBlog = await findBlogById(blogId);
		if (!existingBlog) {
			return res.status(404).json('BLOG NOT FOUND');
		}

		const comment = await findCommentsByBlogId(blogId);
		return res.status(200).json(comment);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const getCommentsByUserId = async (req: Request, res: Response) => {
	const userId = req.params.userId;
	try {
		const existingUser = await findUserById(userId);
		if (!existingUser) {
			return res.status(404).json('USER NOT FOUND');
		}

		const comments = await findCommentsByUserId(userId);
		return res.status(200).json(comments);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const getRepliesByCommentId = async (req: Request, res: Response) => {
	const commentId = req.params.commentId;
	try {
		const existingComment = await findCommentById(commentId);
		if (!existingComment) {
			return res.status(404).json('COMMENT NOT FOUND');
		}

		const comment = await findRepliesByCommentId(commentId);
		return res.status(200).json(comment);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const writeBlogComment = async (req: Request, res: Response) => {
	const { content, blogId } = req.body;
	const { id } = req.user;

	try {
		const existingBlog = await findBlogById(blogId);
		if (!existingBlog) {
			return res.status(404).json('BLOG NOT FOUND');
		}

		const comment = await createComment({
			content,
			blogId,
			userId: id,
		});

		const comments = existingBlog.comments;
		comments.push(comment._id);

		await updateBlogById(blogId, { comments: comments });

		return res.status(200).json(comment);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const writeReplyComment = async (req: Request, res: Response) => {
	const { content, commentId } = req.body;
	const { id } = req.user;

	try {
		const existingComment = await findCommentById(commentId);
		if (!existingComment) {
			return res.status(404).json('COMMENT NOT FOUND');
		}

		if (existingComment.userId == id) {
			return res.status(404).json('CANNOT REPLY TO YOUR OWN COMMENT');
		}

		const comment = await createComment({
			content,
			userId: id,
			blogId: existingComment.blogId,
			parentCommentId: commentId,
		});

		const existingCommentReplies = existingComment.replies;
		existingCommentReplies.push(comment._id);

		await updateCommentById(commentId, { replies: existingCommentReplies });

		return res.status(200).json(comment);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const updateComment = async (req: Request, res: Response) => {
	const commentId = req.params.commentId;
	const updatedComment: TComment = req.body;

	try {
		const existingComment = await findCommentById(commentId);
		if (!existingComment) {
			return res.status(404).json('COMMENT NOT FOUND');
		}

		const comment = await updateCommentById(commentId, updatedComment);
		return res.status(200).json(comment);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const deleteComment = async (req: Request, res: Response) => {
	const commentId = req.params.commentId;
	try {
		const existingComment = await findCommentById(commentId);
		if (!existingComment) {
			return res.status(404).json('COMMENT NOT FOUND');
		}

		await deleteCommentById(commentId);
		return res.status(200).json('COMMENT DELETED');
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};
