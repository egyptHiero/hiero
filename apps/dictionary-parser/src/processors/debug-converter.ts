import { PDFExtractText } from 'pdf.js-extract';
import { PdfParseTableProcessor } from './pdf-table-processor';

function isNumber(x: unknown): x is number {
  return typeof x === 'number';
}

const toFixedLength = (n: number | string, length = 6) => {
  if (isNumber(n)) {
    return n.toFixed().padStart(length, ' ');
  } else {
    return n.padStart(length, ' ');
  }
};

export class DebugConverter {
  private isFirstConversion = true;

  constructor(
    private readonly _getColumnIndex?: PdfParseTableProcessor<unknown>['_getColumnIndex']
  ) {}

  public convert(buffer: PDFExtractText[]): string {
    const result = buffer.map((chunk) => {
      const arr = [];
      if (this._getColumnIndex) {
        arr.push(toFixedLength(this._getColumnIndex(chunk)));
      }
      arr.push(
        toFixedLength(chunk.x),
        toFixedLength(chunk.y),
        toFixedLength(chunk.width),
        toFixedLength(chunk.height),
        toFixedLength(chunk.fontName, 8),
        chunk.str
      );
      return arr.join(' ');
    });
    result.push('---------------\n');

    if (this.isFirstConversion) {
      this.isFirstConversion = false;
      const arr = [];
      if (this._getColumnIndex) {
        arr.push(toFixedLength('col'));
      }
      arr.push(
        toFixedLength('x'),
        toFixedLength('y'),
        toFixedLength('width'),
        toFixedLength('height'),
        toFixedLength('font', 8),
        'str'
      );
      result.unshift(arr.join(' '));
    }

    return result.join('\n');
  }
}
