import { Router } from 'express';

import { login, logout, register } from '@controllers/authControllers';
import { verifyUserToken } from '@middlewares/tokenVerification';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyUserToken, logout);

export default router;
