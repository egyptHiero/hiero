import { PDFExtractOptions } from 'pdf.js-extract';
import { PdfAncient } from '../processors/pdf-ancient-processors';
import { TColumn, TPdfParseProcessor } from '../types';
import { ParserOptions, ProcessorsWithOptions } from './types';
import { combineWithDefaults } from '@hiero/common';

const options: PDFExtractOptions = {
  // skip the first page
  firstPage: 2,
};

const groups: TColumn[] = [
  [52, 260],
  [281, 439],
  [443, 512],
  [516, 729],
  [740, 820],
] as const;

export const getAncientProcessorsWithOptions = ({
  from,
  to,
  debug,
}: ParserOptions): ProcessorsWithOptions => {
  const processors: Array<TPdfParseProcessor<unknown>> = [
    new PdfAncient.DictionaryProcessor(groups),
  ];

  if (debug) {
    processors.push(new PdfAncient.DebugProcessor(groups));
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
