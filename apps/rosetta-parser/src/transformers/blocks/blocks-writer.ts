import { NDJSON_DIR } from '@hiero/common';
import path from 'node:path';
import { createFileWriter } from '../file-writer';

export const createBlocksWriter = () => {
  const outputFileName = path.join(NDJSON_DIR, 'rosetta-blocks.ndjson');

  return createFileWriter(outputFileName, {
    name: 'rosetta-blocks',
    type: 'rosetta',
    description: 'Rosetta stone dictionary blocks',
    link: 'http://rosettastone.hieroglyphic-texts.net',
    language: 'en',
  });
};
