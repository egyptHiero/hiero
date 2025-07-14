import {consoleProgress, NDJSON_DIR, NDJSON_SORTED_DIR} from '@hiero/common';
import * as fs from 'node:fs';
import path from "node:path";
import {pipeline} from 'node:stream/promises';
import {CombTransformer} from './comb-tramsformer';
import {parse, stringify} from "ndjson";

export const combFile = async (
  fileName: string
) => {
  const reader = fs.createReadStream(path.join(NDJSON_DIR, fileName), {autoClose: true});
  fs.mkdirSync(NDJSON_SORTED_DIR, {recursive: true});
  const writer = fs.createWriteStream(path.join(NDJSON_SORTED_DIR, fileName), {autoClose: true});

  await pipeline(
    reader,
    parse(),
    new CombTransformer(),
    stringify(),
    writer
  );

  consoleProgress[fileName].success(`file ${fileName} was successfully handled and saved to ${NDJSON_SORTED_DIR}/`);

  // todo: update record count
};
