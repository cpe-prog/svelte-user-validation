import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { formSchema } from './schema';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/login');
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
		const hashPassword = await new Argon2id().hash(form.data.password);
		const id = generateId(30);

		const existingEmail = form.data.email;
		const existingUser = await db.select().from(user).where(eq(user.email, existingEmail));

		if (existingUser.length > 0) {
			return fail(400, {
				form,
				message: 'Email is already in used'
			});
		}

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
