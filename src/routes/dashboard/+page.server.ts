import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/login');
	return {
		firstName: event.locals.user.firstName,
		lastName: event.locals.user.lastName,
		email: event.locals.user.email,
		content: 'This is a sample report generated with jsPDF in SvelteKit.'
	};
};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: './dashboard',
			...sessionCookie.attributes
		});
		redirect(302, '/login');
	}
};
