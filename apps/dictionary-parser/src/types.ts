import { PDFExtractText } from 'pdf.js-extract';
import { DictionaryMetadata } from '@hiero/common';

export type Dictionary = 'ancient' | 'vygus' | 'hieroes';

export interface TPdfParseProcessor<T> {
  /** Is the chunk is the start of a new block. */
  isNewLine(chunk: PDFExtractText, buffer: PDFExtractText[]): boolean;

  /** Convert the block into the processor's result entity. */
  convert(buffer: PDFExtractText[]): [string, T] | T | undefined;

  /** Object or string mode. */
  getObjectMode(): boolean;

  /** Skip essential chunks. */
  isEssential(chunk: PDFExtractText): boolean;

  /** Name of the output file. */
  getOutputFileName(): string;

  /** Dictionary information. */
  getDictionaryMetadata?(): DictionaryMetadata;
}

export type TColumn = [number, number];

export type DictionaryItem = [string, ...Array<string | undefined>];
