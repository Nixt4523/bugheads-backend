import {
	deleteComment,
	getAllComments,
	getCommentById,
	getCommentsByBlogId,
	getRepliesByCommentId,
	updateComment,
	writeBlogComment,
	writeReplyComment,
} from '@controllers/commentControllers';
import {
	verifyUserToken,
	verifyUserTokenAndAdmin,
	verifyUserTokenAndAuthorization,
} from '@middlewares/tokenVerification';
import { Router } from 'express';

const router = Router();

router.get('/all', verifyUserTokenAndAdmin, getAllComments);
router.get('/:commentId', verifyUserToken, getCommentById);
router.get('/blog/:blogId', verifyUserToken, getCommentsByBlogId);
router.get('/replies/:commentId', verifyUserToken, getRepliesByCommentId);
router.post('/', verifyUserToken, writeBlogComment);
router.post('/reply', verifyUserToken, writeReplyComment);
router.put('/:commentId', verifyUserTokenAndAuthorization, updateComment);
router.delete('/:commentId', verifyUserTokenAndAuthorization, deleteComment);

export default router;