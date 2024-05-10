import PdfPrinter from 'pdfmake';
import blobStream, { type IBlobStream } from 'blob-stream';
import type { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';

const fonts: TFontDictionary = {
	Inter: {
		normal: 'src/lib/server/pdf/fonts/Inter-Regular.ttf',
		bold: 'src/lib/server/pdf/fonts/Inter-Bold.ttf'
	}
};

const printer = new PdfPrinter(fonts);

function printPdf(file: TDocumentDefinitions): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const pdf = printer.createPdfKitDocument(file);

		pdf
			.pipe(blobStream())
			.on('finish', function (this: IBlobStream) {
				console.log('PDF generated');
				resolve(this.toBlob('application/pdf'));
			})
			.on('error', (err) => {
				console.error(err);
				reject(err);
			});

		pdf.end();
	});
}

export default printPdf;
