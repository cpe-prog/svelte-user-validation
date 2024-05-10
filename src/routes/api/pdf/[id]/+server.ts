import printPdf from '$lib/server/pdf/printer';
import generate from '$lib/server/pdf/templates/sample';
import { type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ setHeaders }) => {
	const content = generate({
		size: 'A4',
		orientation: 'portrait',
		margins: 40
	});

	const pdf = await printPdf(content);

	setHeaders({
		'Content-Type': 'application/pdf',
		'Content-Length': pdf.size.toString(),
		'Last-Modified': new Date().toUTCString()
	});

	return new Response(pdf);
}) satisfies RequestHandler;
