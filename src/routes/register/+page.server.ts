import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { formSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		console.log('valid');
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// const formData = await event.request.formData();
		// const email = formData.get('email');
		// const password = formData.get('password');
		// if (
		// 	typeof email !== 'string' ||
		// 	email.length < 3 ||
		// 	email.length > 31 ||
		// 	!/^[a-z0-9_-]+$/.test(email)
		// ) {
		// 	return fail(400, {
		// 		message: 'Invalid email'
		// 	});
		// }
		// if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
		// 	return fail(400, {
		// 		message: 'Invalid password'
		// 	});
		// }

		const hashPassword = await new Argon2id().hash(form.data.password);
		const id = generateId(30);

		await db.insert(user).values({
			id,
			provider: 'manual',
			providerId: '',
			firstName: form.data.firstName,
			lastName: form.data.lastName,
			role: 'admin',
			email: form.data.email,
			username: '',
			hashPassword: hashPassword,
			avatarUrl: ''
		});
		const session = await lucia.createSession(id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, '/login');
	}
};
