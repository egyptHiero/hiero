import { PDFExtractOptions } from 'pdf.js-extract';
import { TPdfParseProcessor } from '../types';

export interface ParserOptions {
  from?: number;
  to?: number;
  debug?: boolean;
}

export interface ProcessorsWithOptions {
  options: PDFExtractOptions;
  processors: Array<TPdfParseProcessor<unknown>>;
}
