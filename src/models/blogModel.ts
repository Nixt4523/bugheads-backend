import BlogSchema from '@schema/blogSchema';
import { InferSchemaType, model } from 'mongoose';

export type TBlog = InferSchemaType<typeof BlogSchema>;

const Blog = model<TBlog>('Blog', BlogSchema);
export default Blog;

export const createBlog = (values: Partial<TBlog>) =>
	new Blog(values).save().then((blog) => blog.toObject());

export const findAllBlogs = async (filters: any) => {
	if (filters.featured === 'true') {
		return findFeaturedBlogs();
	}
	if (filters.sort === 'liked') {
		const blogs = findMostLikedBlogs();
		return (await blogs).map((blog) => blog.blog);
	}
	if (filters.sort === 'newest') {
		return findNewestBlogs();
	}
	if (filters.tag) {
		return findBlogsByTag(filters.tag);
	}

	return Blog.find();
};

export const findBlogById = (blogId: string) => Blog.findById(blogId);

export const findFeaturedBlogs = () => Blog.find({ isFeatured: true });

export const findNewestBlogs = () =>
	Blog.aggregate([
		{
			$sort: { createdAt: -1 },
		},
	]);

export const findMostLikedBlogs = () =>
	Blog.aggregate([
		{
			$project: {
				_id: 1,
				likesCount: { $size: '$likes' },
			},
		},
		{
			$sort: { likesCount: -1 },
		},
		{
			$lookup: {
				from: 'blogs',
				localField: '_id',
				foreignField: '_id',
				as: 'blog',
			},
		},
		{
			$unwind: '$blog',
		},
	]);

export const findBlogsByTag = (tag: string) =>
	Blog.find({ tags: tag }).limit(5);

export const findBlogsByUserId = (userId: string) =>
	Blog.find({ userId: userId });

export const updateBlogById = (blogId: string, values: Partial<TBlog>) =>
	Blog.findByIdAndUpdate(blogId, { $set: values }, { new: true });

export const deleteBlogById = (blogId: string) =>
	Blog.findByIdAndDelete(blogId);
