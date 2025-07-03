import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'stream';
import { PdfExtractorTransformer } from '../transformers/pdf-extractor-transformer';
import { stringify } from 'ndjson';
import { TPdfParseProcessor } from '../types';
import { Transform } from 'node:stream';
import {consoleProgress} from "@hiero/common";

const NDJSON_DIR = './data/ndjson';

export const createPipeline = (
  writer: Transform,
  processor: TPdfParseProcessor<unknown>
) => {
  const outputStreams = [];
  const fileName = processor.getOutputFileName();
  consoleProgress[fileName].progress(`writing output file: ${fileName}`)

  if (processor.getObjectMode()) {
    // add stringify only for object-mode streams
    outputStreams.push(stringify());
  }

  const fullFileName = path.join(NDJSON_DIR, fileName);

  fs.mkdirSync(NDJSON_DIR, { recursive: true });
  outputStreams.push(
    fs.createWriteStream(fullFileName, {
      flags: 'w',
      autoClose: true,
    })
  );

  return pipeline(
    writer,
    new PdfExtractorTransformer(processor),
    ...outputStreams,
    (err: unknown) => {
      if (err) {
        consoleProgress[fileName].error(`error writing output file: ${fileName}`)
      }
    }
  ).on('finish', () => {
    consoleProgress[fileName].success(`created output file: ${fileName}`)
  });
};
