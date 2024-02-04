import { rateLimit } from 'express-rate-limit';

const rateLimiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 10,
	message: 'RATE LIMIT EXCEEDED',
	legacyHeaders: true,
});

export default rateLimiter;
