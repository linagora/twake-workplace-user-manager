import { z } from 'zod';

export const toggleUserSchema = z.object({
	cn: z.string().min(1, { message: 'Invalid common name' })
});
