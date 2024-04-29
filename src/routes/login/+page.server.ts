import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
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

		// const existingUser = await db.query('email').where('username', '=', email.toLowerCase()).get();
		// if (!existingUser) {
		// 	return fail(400, {
		// 		message: 'Incorrect email or password'
		// 	});
		// }
		// const pass = await new Argon2id().hash(form.data.password);
		// const validPassword = await verify(existingUser.password_hash, pass);
		// if (!validPassword) {
		// 	return fail(400, {
		// 		message: 'Incorrect username or password'
		// 	});
		// }

		// const session = await lucia.createSession( {});
		// const sessionCookie = lucia.createSessionCookie(session.id);
		// event.cookies.set(sessionCookie.name, sessionCookie.value, {
		// 	path: '.',
		// 	...sessionCookie.attributes
		// });
		return redirect(302, '/');
	}
};
