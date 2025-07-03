import { PDFExtractOptions } from 'pdf.js-extract';
import { PdfHieroglyphs } from '../processors/pdf-hieroglyphs-processors';
import { TColumn, TPdfParseProcessor } from '../types';
import { combineWithDefaults } from '@hiero/common';
import { ParserOptions, ProcessorsWithOptions } from './types';

const options: PDFExtractOptions = {
  // skip the first page
  firstPage: 2,
};

const groups: TColumn[] = [
  [41, 90],
  [95, 125],
  [134, 181],
  [190, 270],
  [280, 329],
  [338, 565],
] as const;

export const getHieroglyphsProcessorsWithOptions = ({
  from,
  to,
  debug,
}: ParserOptions): ProcessorsWithOptions => {
  const processors: Array<TPdfParseProcessor<unknown>> = [
    new PdfHieroglyphs.LetterClassificationProcessor(groups),
    new PdfHieroglyphs.DictionaryProcessor(groups),
    new PdfHieroglyphs.HieroglyphsProcessor(groups),
  ];

  if (debug) {
    processors.push(new PdfHieroglyphs.DebugProcessor(groups));
  }

  return {
    options: combineWithDefaults(
      {
        firstPage: from,
        lastPage: to,
      },
      options
    ),
    processors,
  };
};
