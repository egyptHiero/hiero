import { TPdfParseProcessor } from '../types';
import { PDFExtractText } from 'pdf.js-extract';

type TColumn = [number, number];

/**
 * Processor for pdf-files with table structured data.
 *
 * Columns could be calculated with PdfColumnBoundariesCalculator
 */
export abstract class PdfParseTableProcessor<T> implements TPdfParseProcessor<T> {
  constructor(protected readonly columns: TColumn[]) {}

  _getItemsByColumn(buffer: PDFExtractText[], n: number) {
    return buffer.filter(({ x, width }) => {
      if (this.columns[n]) {
        const [x1, x2] = this.columns[n];
        return Math.round(x + width) <= x2 && Math.round(x) >= x1;
      }

      return false;
    });
  }

  _getColumnIndex({ x, width }: PDFExtractText) {
    return this.columns.findIndex(([x1, x2]) => x + width >= x1 && x <= x2);
  }

  isNewLine(
    chunk: PDFExtractText,
    buffer: PDFExtractText[],
  ): boolean {
    const prevChunk = buffer[buffer.length - 1];
    const chunkColumn = this._getColumnIndex(chunk);
    const prevColumn = prevChunk ? this._getColumnIndex(prevChunk) : chunkColumn;
    return chunkColumn < prevColumn;
  }

  convert(_buffer: PDFExtractText[]): [string, T] | T | undefined {
    return undefined;
  }

  getObjectMode() {
    return true;
  }

  isEssential(chunk: PDFExtractText): boolean {
    return !!chunk.str?.trim();
  }

  abstract getOutputFileName(): string;
}
