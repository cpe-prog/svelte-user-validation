import printPdf from '$lib/server/pdf/printer';
import generate from '$lib/server/pdf/templates/sample';
import { type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ setHeaders, url }) => {
	const width = Number(url.searchParams.get('pageWidth'));
	const height = Number(url.searchParams.get('pageHeight'));
	const orientation = url.searchParams.get('orientation');
	const margins = Number(url.searchParams.get('margin'));

	const settings: PageSettings = {
		width: width,
		height: height,
		orientation: orientation === null || orientation === 'portrait' ? 'portrait' : 'landscape',
		margins: margins
	};

	const content = generate(settings);

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
