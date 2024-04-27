import type { Config } from 'drizzle-kit';
import 'dotenv/config';

const url =
    process.env.TURSO_CONFIG === 'dev' ? process.env.TURSO_LOCAL : process.env.TURSO_CONNECTION_URL;

const config = {
    schema: './src/lib/server/db/schema',
    out: './migrations',
    driver: 'turso',
    dbCredentials: {
        url: url,
        authToken: process.env.TURSO_AUTH_TOKEN
    }
};

export default config satisfies Config;
