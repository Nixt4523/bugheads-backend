import {
	deleteBlog,
	getAllBlogs,
	getBlogById,
	getBlogsByUserId,
	updateBlogDetails,
	writeBlog,
} from '@controllers/blogControllers';
import {
	verifyUserToken,
	verifyUserTokenAndAuthorization,
} from '@middlewares/tokenVerification';
import { Router } from 'express';

const router = Router();

router.get('/', getAllBlogs);
router.get('/:blogId', verifyUserToken, getBlogById);
router.get('/user/:userId', verifyUserToken, getBlogsByUserId);
router.post('/', verifyUserToken, writeBlog);
router.put('/:blogId', verifyUserTokenAndAuthorization, updateBlogDetails);
router.delete('/:blogId', verifyUserTokenAndAuthorization, deleteBlog);

export default router;
