import { DebugConverter } from './debug-converter';
import { PDFExtractText } from 'pdf.js-extract';
import { PdfParseTableProcessor } from './pdf-table-processor';
import { DictionaryItem } from '../types';
import { DictionaryMetadata } from '@hiero/common';
import { normalizeHieroes } from '@hiero/db';

const transliterationMap: Record<string, string> = {
  A: 'ꜣ',
  D: 'ḏ',
  H: 'ḥ',
  I: 'ỉ',
  K: 'ḳ',
  S: 'š',
  T: 'ṯ',
  X: 'ḫ',
  a: 'ꜥ',
  j: 'ï',
  x: 'ḫ',
} as const;

const transliterationRegExp = new RegExp(
  `[${Object.keys(transliterationMap).join()}]`,
  'g',
);

/**
 * Transliterate characters in string according to
 * https://en.wiktionary.org/wiki/Appendix:Egyptian_transliteration_schemes
 *
 * @param text  - string to transliterate
 */
const transliterate = (text?: string) =>
  text?.replace(
    transliterationRegExp,
    (char) => transliterationMap[char] || char,
  );

class DebugProcessor extends PdfParseTableProcessor<string> {
  private converter = new DebugConverter((chunk) =>
    this._getColumnIndex(chunk),
  );

  override convert(_buffer: PDFExtractText[]): string {
    return this.converter.convert(_buffer);
  }

  override getObjectMode(): boolean {
    return false;
  }

  getOutputFileName(): string {
    return 'ancient.txt';
  }
}

class DictionaryProcessor extends PdfParseTableProcessor<DictionaryItem> {
  override convert(
    buffer: PDFExtractText[],
  ): [string, DictionaryItem] | undefined {
    if (buffer.every(({ fontName }) => fontName === 'TrebuchetMS')) {
      return undefined;
    }

    const hieroName = this._getItemsByColumn(buffer, 1)
      .map(({ str }) => str)
      .join('');
    if (hieroName) {
      return [
        normalizeHieroes(hieroName),
        [
          this._getItemsByColumn(buffer, 3)
            .map(({ str }) => str)
            .join(' '),
          this._getItemsByColumn(buffer, 4)
            .map(({ str }) => str)
            .join(' '),
          transliterate(
            this._getItemsByColumn(buffer, 2)
              .map(({ str }) => str)
              .join(' '),
          ),
        ],
      ];
    }

    return undefined;
  }

  getOutputFileName(): string {
    return 'ancient_en.ndjson';
  }

  getDictionaryMetadata(): DictionaryMetadata {
    return {
      name: 'ancient',
      type: 'dictionary',
      description: 'Dictionary of Ancient Egyptian Hieroglyphs',
      link: 'https://www.ancient-egypt.co.uk/transliteration/',
      language: 'en',
    };
  }
}

export const PdfAncient = {
  DebugProcessor,
  DictionaryProcessor,
};
