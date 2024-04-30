import { z } from 'zod';

export const formSchema = z.object({
	email: z
		.string()
		.min(5, '')
		.refine((value) => value.includes('@'), {
			message: 'Invalid email (must contain @)'
		}),
	password: z
		.string()
		.min(8, 'Invalid Password')
		.refine((value) => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value), {
			message: ''
		})
});

export type FormSchema = typeof formSchema;
