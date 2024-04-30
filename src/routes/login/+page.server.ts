import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { verify } from 'argon2';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from '../$types.js';
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
		console.log('1');
		const existingUser = await db
			.select()
			.from(user)
			.where(eq(user.email, form.data.email.toLocaleLowerCase()))
			.get();
		if (!existingUser) {
			console.log('2');
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		const verifyPassword = await verify(existingUser.hashPassword, form.data.password);
		if (!verifyPassword) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, '/');
	}
};
