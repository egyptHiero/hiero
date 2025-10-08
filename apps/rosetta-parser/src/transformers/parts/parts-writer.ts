import { NDJSON_DIR } from '@hiero/common';
import path from 'node:path';
import { createFileWriter } from '../file-writer';

export const createPartsWriter = () => {
  const outputFileName = path.join(NDJSON_DIR, 'rosetta-parts.ndjson');

  return createFileWriter(outputFileName, {
    name: 'rosetta-parts',
    type: 'rosetta',
    language: 'en',
  });
};
