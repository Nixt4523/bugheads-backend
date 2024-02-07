import { logger } from '@middlewares/logger';
import {
	TBlog,
	createBlog,
	deleteBlogById,
	findAllBlogs,
	findBlogById,
	findBlogsByUserId,
	updateBlogById,
} from '@models/blogModel';
import { findUserById } from '@models/userModel';
import { Request, Response } from 'express';

export const getAllBlogs = async (req: Request, res: Response) => {
	const filters = req.query;

	try {
		const blogs = await findAllBlogs(filters);
		return res.status(200).json(blogs);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const getBlogById = async (req: Request, res: Response) => {
	const blogId = req.params.blogId;

	try {
		const blog = await findBlogById(blogId);
		if (!blog) {
			return res.status(404).json('BLOG NOT FOUND');
		}

		return res.status(200).json(blog);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const getBlogsByUserId = async (req: Request, res: Response) => {
	const userId = req.params.userId;

	try {
		const existingUser = await findUserById(userId);
		if (!existingUser) {
			return res.status(404).json('USER NOT FOUND');
		}

		const blogs = await findBlogsByUserId(userId);
		return res.status(200).json(blogs);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const writeBlog = async (req: Request, res: Response) => {
	const { title, content, thumbnail } = req.body;
	const { id } = req.user;

	try {
		const blog = await createBlog({ title, content, thumbnail, userId: id });
		return res.status(201).json(blog);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const updateBlog = async (req: Request, res: Response) => {
	const blogId = req.params.blogId;
	const updatedDetails: TBlog = req.body;

	try {
		const existingBlog = await findBlogById(blogId);
		if (!existingBlog) {
			return res.status(404).json('BLOG NOT FOUND');
		}

		const blog = await updateBlogById(blogId, updatedDetails);
		return res.status(200).json(blog);
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};

export const deleteBlog = async (req: Request, res: Response) => {
	const blogId = req.params.blogId;
	try {
		const existingBlog = await findBlogById(blogId);
		if (!existingBlog) {
			return res.status(404).json('BLOG NOT FOUND');
		}

		await deleteBlogById(blogId);
		return res.status(200).json('BLOG DELETED');
	} catch (error) {
		logger.error(`[ERROR] : ${error}`);
		return res.status(500).json(error);
	}
};
