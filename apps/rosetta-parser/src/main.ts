import fs from 'node:fs';
import path from 'node:path';
import { NDJSON_DIR, RESOURCES_DIR } from '@hiero/common';
import { pipeline, PassThrough } from 'stream';
import { stringify } from 'ndjson';
import { createHtmlParserStream } from './html-parser';

const parseRosetta = () => {
  const inputFileName = path.join(
    RESOURCES_DIR,
    'rosetta',
    'Whole text with IDs _ The Rosetta Stone online.html',
  );

  const outputFileName = path.join(NDJSON_DIR, 'rosetta.ndjson');

  const passThrough = new PassThrough({ objectMode: true });
  passThrough.push({
    name: 'rosetta',
    type: 'rosetta',
    language: 'en',
  });

  pipeline(
    fs.createReadStream(inputFileName),
    createHtmlParserStream(passThrough),
    (err) => {
      if (err) console.error('Parsing error:', err);
    },
  );

  pipeline(
    passThrough,
    stringify(),
    fs.createWriteStream(outputFileName, {
      autoClose: true,
    }),
    (err) => {
      if (err) console.error(`Error saving ${outputFileName}:`, err);
    },
  );
};

void parseRosetta();
