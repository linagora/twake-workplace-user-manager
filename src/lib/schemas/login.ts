import { z } from 'zod';

export const loginSchema = z.object({
	username: z.string().min(1, { message: 'Invalid username' }),
	password: z.string().min(6, { message: 'Invalid password' })
});
