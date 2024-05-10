import printPdf from '$lib/server/pdf/printer';
import generate from '$lib/server/pdf/templates/sample';
import { type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ setHeaders, url }) => {
	const content = generate({
		width: Number(url.searchParams.get('pageWidth')),
		height: Number(url.searchParams.get('pageHeigth')),
		orientation: url.searchParams.get('orientation'),
		margins: Number(url.searchParams.get('margin'))
	});

	console.log(Number(url.searchParams.get('pageWidth')));
	console.log(Number(url.searchParams.get('pageHeight')));

	const pdf = await printPdf(content);

	setHeaders({
		'Content-Type': 'application/pdf',
		'Content-Width': pdf.size.toString(),
		'Last-Modified': new Date().toUTCString()
	});

	return new Response(pdf);
}) satisfies RequestHandler;
