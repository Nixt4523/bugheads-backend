import {
	verifyUserToken,
	verifyUserTokenAndAdmin,
	verifyUserTokenAndAuthorization,
} from '@middlewares/tokenVerification';
import { Router } from 'express';

const router = Router();

router.get('/all', verifyUserTokenAndAdmin);
router.get('/:commentId');
router.get('/:blogId');
router.post('/', verifyUserToken);
router.put('/:commentId', verifyUserTokenAndAuthorization);
router.delete('/:commentId', verifyUserTokenAndAuthorization);

export default router;
