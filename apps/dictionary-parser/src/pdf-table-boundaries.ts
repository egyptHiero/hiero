import { PDFExtract } from 'pdf.js-extract';
import { PdfColumnBoundariesCalculator } from './transformers/pdf-column-boundaries-calculator';

export const calculateBoundaries = (fileName: string, firstPage?: number, lastPage?: number) =>new PDFExtract()
  .extract(fileName, {
    firstPage,
    lastPage,
  })
  .then((data) => {
    const writer = new PdfColumnBoundariesCalculator();
    writer.events.on('groups', e => console.log(`Columns boundaries for ${fileName}: ${JSON.stringify(e)}`));

    data.pages.forEach((page) => {
      page.content.forEach((item) => {
        writer.write(item);
      });
    });

    writer.end();
  });
