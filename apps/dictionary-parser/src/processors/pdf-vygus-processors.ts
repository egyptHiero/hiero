import { DebugConverter } from './debug-converter';
import { PDFExtractText } from 'pdf.js-extract';
import type { DictionaryItem, TPdfParseProcessor } from '../types';
import { DictionaryMetadata } from '@hiero/common';

abstract class VygusProcessor<T> implements TPdfParseProcessor<T> {
  isNewLine(chunk: PDFExtractText, buffer: PDFExtractText[]): boolean {
    const prevFontName = buffer[buffer.length - 1]?.fontName;
    return chunk.fontName === 'g_d0_f1' && prevFontName !== chunk.fontName;
  }

  abstract convert(buffer: PDFExtractText[]): [string, T] | T | undefined;

  getObjectMode(): boolean {
    return true;
  }

  abstract getOutputFileName(): string;

  isEssential(): boolean {
    return true;
  }
}

class DebugProcessor extends VygusProcessor<string> {
  private converter = new DebugConverter();

  override convert(buffer: PDFExtractText[]) {
    return this.converter.convert(buffer);
  }

  override getObjectMode(): boolean {
    return false;
  }

  getOutputFileName(): string {
    return 'vygus.txt';
  }
}

class DictionaryProcessor extends VygusProcessor<DictionaryItem> {
  private hieroRegexp =
    /^(.*?)([A-Z]+[0-9]+[A-Z]*(\s?-\s?[A-Z]+[0-9]+[A-Z]*)*)$/;

  override convert(
    buffer: PDFExtractText[]
  ): [string, DictionaryItem] | undefined {
    const map = buffer.reduce<Record<string, string[]>>((acc, value) => {
      if (acc[value.fontName]) {
        acc[value.fontName]?.push(value.str);
      } else {
        acc[value.fontName] = [value.str];
      }
      return acc;
    }, {});

    const data = map['g_d0_f3']?.join('');
    const m = data?.match(this.hieroRegexp);
    const hiero = m?.[2]?.replace(/\s+/g, '');
    const description = m?.[1]
      ?.replace(/([-[])\s+/g, '$1')
      .replace(/\s+([-\]])+/g, '$1')
      .trim();
    const interpretation = map['g_d0_f2']?.join('');

    return hiero && interpretation
      ? [hiero, [interpretation, description]]
      : undefined;
  }

  override getObjectMode(): boolean {
    return true;
  }

  getOutputFileName(): string {
    return 'vygus_en.ndjson';
  }

  getDictionaryMetadata(): DictionaryMetadata {
    return {
      name: 'vygus',
      type: 'dictionary',
      description: 'Mark Vygus Middle Egyptian Dictionary',
      link: 'https://rhbarnhart.net/VYGUS_Dictionary_2018.pdf',
      language: 'en',
    };
  }
}

export const PdfVygus = {
  DebugProcessor,
  DictionaryProcessor,
};
