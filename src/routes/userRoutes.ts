import { Router } from 'express';

import {
	deleteUser,
	updateUserDetails,
	updateUserPassword,
} from '@controllers/userControllers';
import { verifyUserTokenAndAuthorization } from '@middlewares/tokenVerification';

const router = Router();

router.put('/:userId', verifyUserTokenAndAuthorization, updateUserDetails);
router.put(
	'/changePassword/:userId',
	verifyUserTokenAndAuthorization,
	updateUserPassword
);
router.delete('/:userId', verifyUserTokenAndAuthorization, deleteUser);

export default router;
