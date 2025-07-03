import { PDFExtractText } from 'pdf.js-extract';
import { DictionaryMetadata } from '@hiero/common';

export type Dictionary = 'ancient' | 'vygus' | 'hieroes';

export interface TPdfParseProcessor<T> {
  isNewLine(chunk: PDFExtractText, buffer: PDFExtractText[]): boolean;

  convert(buffer: PDFExtractText[]): [string, T] | T | undefined;

  getObjectMode(): boolean;

  isEssential(chunk: PDFExtractText): boolean;

  getOutputFileName(): string;

  getDictionaryMetadata?(): DictionaryMetadata;
}

export type TColumn = [number, number];

export type DictionaryItem = [string, ...Array<string | undefined>];
