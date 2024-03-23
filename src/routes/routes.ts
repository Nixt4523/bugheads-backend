import { Router } from 'express';

import authRoutes from '@routes/authRoutes';
import blogRoutes from '@routes/blogRoutes';
import commentRoutes from '@routes/commentRoutes';
import userRoutes from '@routes/userRoutes';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

export default router;
