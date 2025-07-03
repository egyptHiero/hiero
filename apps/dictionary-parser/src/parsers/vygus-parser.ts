import { PDFExtractOptions } from 'pdf.js-extract';
import { PdfVygus } from '../processors/pdf-vygus-processors';
import { TPdfParseProcessor } from '../types';
import { ParserOptions, ProcessorsWithOptions } from './types';
import { combineWithDefaults } from '@hiero/common';

const options: PDFExtractOptions = {};

export const getVygusProcessorsWithOptions = ({
  from,
  to,
  debug,
}: ParserOptions): ProcessorsWithOptions => {
  const processors: Array<TPdfParseProcessor<unknown>> = [
    new PdfVygus.DictionaryProcessor(),
  ];

  if (debug) {
    processors.push(new PdfVygus.DebugProcessor());
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
