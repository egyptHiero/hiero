import { PDFExtractText } from 'pdf.js-extract';
import { PdfParseTableProcessor } from './pdf-table-processor';
import { DebugConverter } from './debug-converter';
import { DictionaryItem } from '../types';
import { DictionaryMetadata } from '@hiero/common';

abstract class PdfHieroglyphsTableProcessor<
  T
> extends PdfParseTableProcessor<T> {
  override isNewLine(chunk: PDFExtractText): boolean {
    if (chunk.fontName === 'g_d0_f9') {
      // non-table data
      return true;
    } else if (chunk.fontName === 'g_d0_f3') {
      // hiero
      return true;
    } else if (
      chunk.fontName === 'g_d0_f2' &&
      this._getColumnIndex(chunk) === 1
    ) {
      // letter classification
      return true;
    }

    return false;
  }
}

class LetterClassificationProcessor extends PdfHieroglyphsTableProcessor<string> {
  override convert(buffer: PDFExtractText[]): [string, string] | undefined {
    const letter = this._getItemsByColumn(buffer, 1)[0]?.str;
    if (
      letter &&
      buffer.every(
        (v) => v.fontName.endsWith('f2') || v.fontName.endsWith('f1')
      )
    ) {
      return [
        letter,
        this._getItemsByColumn(buffer, 3)
          .map(({ str }) => str)
          .join(' '),
      ];
    }

    return undefined;
  }

  getOutputFileName(): string {
    return 'hieroglyphs-classification.ndjson';
  }
}

class DictionaryProcessor extends PdfHieroglyphsTableProcessor<DictionaryItem> {
  override convert(
    buffer: PDFExtractText[]
  ): [string, DictionaryItem] | undefined {
    const hieroName = buffer[1]?.str;

    if (hieroName && buffer[0]?.fontName === 'g_d0_f3') {
      return [
        hieroName,
        [
          this._getItemsByColumn(buffer, 3)
            .map(({ str }) => str)
            .join(' '),
          this._getItemsByColumn(buffer, 5)
            .map(({ str }) => str)
            .join(' '),
        ],
      ];
    }

    return undefined;
  }

  getOutputFileName(): string {
    return 'hieroglyphs_en.ndjson';
  }

  getDictionaryMetadata(): DictionaryMetadata {
    return {
      name: 'hieroglyphs',
      type: 'dictionary',
      description: `List of Egyptian hieroglyphs`,
      link: 'https://en.wikipedia.org/wiki/List_of_Egyptian_hieroglyphs',
      language: 'en',
    };
  }
}

class HieroglyphsProcessor extends PdfHieroglyphsTableProcessor<string> {
  override convert(buffer: PDFExtractText[]): [string, string] | undefined {
    const hieroName = buffer[1]?.str;
    const description = this._getItemsByColumn(buffer, 2)
      .map(({ str }) => str)
      .join(' ');
    if (hieroName && description && buffer[0]?.fontName === 'g_d0_f3') {
      return [hieroName, description];
    }

    return undefined;
  }

  getOutputFileName(): string {
    return 'hieroglyphs-description_en.ndjson';
  }

  getDictionaryMetadata(): DictionaryMetadata {
    return {
      name: 'hieroglyphs-description',
      type: 'hieroglyphs',
      description: `Description of Egyptian hieroglyphs`,
      link: 'https://en.wikipedia.org/wiki/List_of_Egyptian_hieroglyphs',
      language: 'en',
    };
  }
}

class DebugProcessor extends PdfHieroglyphsTableProcessor<string> {
  private converter = new DebugConverter((chunk) =>
    this._getColumnIndex(chunk)
  );

  override convert(_buffer: PDFExtractText[]): string {
    return this.converter.convert(_buffer);
  }

  override getObjectMode(): boolean {
    return false;
  }

  getOutputFileName(): string {
    return 'hieroglyphs.txt';
  }
}

export const PdfHieroglyphs = {
  DebugProcessor,
  DictionaryProcessor,
  LetterClassificationProcessor,
  HieroglyphsProcessor,
};
