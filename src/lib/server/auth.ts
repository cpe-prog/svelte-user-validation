import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { redirect } from '@sveltejs/kit';
import { GitHub } from 'arctic';
import { Lucia } from 'lucia';
import { db } from './db';
import { session, user } from './db/schema/user';

const adapter = new DrizzleSQLiteAdapter(db, session, user);

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === 'production'
		}
	},
	getUserAttributes: (data) => {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			role: data.role,
			avatarUrl: data.avatarUrl
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			firstName: string;
			lastName: string;
			role: string;
			email: string;
			avatarUrl: string;
		};
	}
}
