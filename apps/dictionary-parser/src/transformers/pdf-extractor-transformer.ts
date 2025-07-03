import { Transform, TransformCallback } from 'node:stream';
import { PDFExtractText } from 'pdf.js-extract';
import { TPdfParseProcessor } from '../types';

export class PdfExtractorTransformer<T> extends Transform {
  protected buffer: PDFExtractText[] = [];

  constructor(private readonly processor: TPdfParseProcessor<T>) {
    super({ objectMode: true });

    const dictionaryInfo = processor.getDictionaryMetadata?.();
    if (dictionaryInfo) {
      this.push(dictionaryInfo)
    }
  }

  override _transform(
    chunk: PDFExtractText,
    _encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    if (!this.processor.isEssential(chunk)) {
      callback();
      return;
    }

    let isNewLine;

    try {
      isNewLine = this.processor.isNewLine(chunk, this.buffer);
    } catch (e) {
      callback(e as Error);
      return;
    }

    if (isNewLine) {
      this._flush(() => {
        this.buffer.push(chunk);
        callback();
      });
    } else {
      this.buffer.push(chunk);

      callback();
    }
  }

  override _flush(callback: TransformCallback): void {
    try {
      const item = this.processor.convert(this.buffer);
      if (item) {
        this.push(item);
      }
      this.buffer = [];

      callback();
    } catch (e) {
      callback(e as Error);
    }
  }
}
