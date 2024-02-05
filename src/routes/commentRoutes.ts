import {
	getAllComments,
	getCommentById,
	getCommentsByBlogId,
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
router.get('/:blogId', verifyUserToken, getCommentsByBlogId);
router.post('/', verifyUserToken);
router.put('/:commentId', verifyUserTokenAndAuthorization);
router.delete('/:commentId', verifyUserTokenAndAuthorization);

export default router;
