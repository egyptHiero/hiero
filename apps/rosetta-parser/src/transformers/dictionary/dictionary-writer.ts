import { NDJSON_DIR } from '@hiero/common';
import path from 'node:path';
import { createFileWriter } from '../file-writer';

export const createDictionaryWriter = () => {
  const outputFileName = path.join(NDJSON_DIR, 'rosetta.ndjson');

  return createFileWriter(outputFileName, {
    name: 'rosetta',
    type: 'dictionary',
    description: 'Rosetta stone dictionary',
    link: 'http://rosettastone.hieroglyphic-texts.net',
    language: 'en',
  });
};
