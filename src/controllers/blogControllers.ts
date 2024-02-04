import {
	TBlog,
	createBlog,
	deleteBlogById,
	findAllBlogs,
	findBlogById,
	findBlogsByUserId,
	updateBlogById,
} from '@models/blogModel';
import { Request, Response } from 'express';

export const getAllBlogs = async (req: Request, res: Response) => {
	const filters = req.query;

	try {
		const blogs = await findAllBlogs(filters);
		return res.status(200).json(blogs);
	} catch (error) {
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
		return res.status(500).json(error);
	}
};

export const getBlogsByUserId = async (req: Request, res: Response) => {
	const userId = req.params.userId;

	try {
		const blogs = await findBlogsByUserId(userId);
		return res.status(200).json(blogs);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const writeBlog = async (req: Request, res: Response) => {
	const { title, content, thumbnail, userId } = req.body;

	try {
		const blog = await createBlog({ title, content, thumbnail, userId });
		return res.status(201).json(blog);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const updateBlogDetails = async (req: Request, res: Response) => {
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
		return res.status(500).json(error);
	}
};

export const deleteBlog = async (req: Request, res: Response) => {
	const blogId = req.params.blogId;
	try {
		await deleteBlogById(blogId);
		return res.status(200).json('BLOG DELETED');
	} catch (error) {
		return res.status(500).json(error);
	}
};
