import { Router } from 'express';

import {
	deleteUser,
	updateUser,
	updateUserPassword,
} from '@controllers/userControllers';
import { verifyUserTokenAndAuthorization } from '@middlewares/tokenVerification';

const router = Router();

router.put('/:userId', verifyUserTokenAndAuthorization, updateUser);
router.put(
	'/changePassword/:userId',
	verifyUserTokenAndAuthorization,
	updateUserPassword
);
router.delete('/:userId', verifyUserTokenAndAuthorization, deleteUser);

export default router;
