import { z } from 'zod';

export const formSchema = z.object({
	firstName: z.string().min(3, 'Invalid First Name'),
	lastName: z.string().min(3, 'Invalid Last Name'),
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
