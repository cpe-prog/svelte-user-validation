import printPdf from '$lib/server/pdf/printer';
import generate from '$lib/server/pdf/templates/sample';
import { type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ setHeaders, url }) => {
	const content = generate({
		size: url.searchParams.get('pageSize'),
		orientation: url.searchParams.get('orientation'),
		margins: Number(url.searchParams.get('margin'))
	});

	const pdf = await printPdf(content);

	setHeaders({
		'Content-Type': 'application/pdf',
		'Content-Length': pdf.size.toString(),
		'Last-Modified': new Date().toUTCString()
	});

	return new Response(pdf);
}) satisfies RequestHandler;
