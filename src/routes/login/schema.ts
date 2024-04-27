import { z } from 'zod';

export const formSchema = z.object({
	email: z
		.string()
		.min(5, 'Email must be at least 5 characters long')
		.refine((value) => value.includes('@'), {
			message: 'Invalid email (must contain @)'
		}),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.refine((value) => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value), {
			message: 'Password must contain at least one letter, one number, and one special character'
		})
});

export type FormSchema = typeof formSchema;
