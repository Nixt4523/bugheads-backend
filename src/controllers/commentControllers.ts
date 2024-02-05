import { updateBlogById } from '@models/blogModel';
import {
	TComment,
	createBlogComment,
	deleteCommentById,
	findAllComments,
	findCommentById,
	findCommentsByBlogId,
	findCommentsByUserId,
} from '@models/commentModel';
import { Request, Response } from 'express';

export const getAllComments = async (req: Request, res: Response) => {
	try {
		const comments = await findAllComments();
		return res.status(200).json(comments);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const getCommentById = async (req: Request, res: Response) => {
	const commentId = req.params.commentId;

	try {
		const comment = await findCommentById(commentId);
		return res.status(200).json(comment);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const getCommentsByBlogId = async (req: Request, res: Response) => {
	const blogId = req.params.blogId;
	try {
		const comment = await findCommentsByBlogId(blogId);
		return res.status(200).json(comment);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const getCommentsByUserId = async (req: Request, res: Response) => {
	const userId = req.params.userId;
	try {
		const comments = await findCommentsByUserId(userId);
		return res.status(200).json(comments);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const writeComment = async (req: Request, res: Response) => {
	const { content, blogId, userId } = req.body;

	try {
		const comment = await createBlogComment({
			content,
			blogId,
			creatorId: userId,
		});
		return res.status(200).json(comment);
	} catch (error) {
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

		const comment = await updateBlogById(commentId, updatedComment);
		return res.status(200).json(comment);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const deleteComment = async (req: Request, res: Response) => {
	const commentId = req.params.commentId;
	try {
		await deleteCommentById(commentId);
		return res.status(200).json('COMMENT DELETED');
	} catch (error) {
		return res.status(500).json(error);
	}
};
