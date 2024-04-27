import 'dotenv/config';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const config = process.env.TURSO_CONFIG;
const local = process.env.TURSO_LOCAL;
const connectionUrl = process.env.TURSO_CONNECTION_URL;
const url = config === 'dev' ? local : connectionUrl;

const client = createClient({
	url: url!,
	authToken: process.env.TURSO_AUTH_TOKEN!
});
export const db = drizzle(client, { schema });

