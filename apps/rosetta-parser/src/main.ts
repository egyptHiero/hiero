import fs from 'node:fs';
import path from 'node:path';
import { consoleProgress, RESOURCES_DIR } from '@hiero/common';
import { pipeline } from 'node:stream/promises';
import { PassThrough } from 'node:stream';
import { createPartsWriter } from './transformers/parts/parts-writer';
import { stringify } from 'ndjson';
import { createDictionaryWriter } from './transformers/dictionary/dictionary-writer';
import { HtmlParser } from './transformers/html-parser';
import { EntityTransformer } from './transformers/entity-transformer';
import { PartsTransformer } from './transformers/parts/parts-transformer';
import { DictionaryTransformer } from './transformers/dictionary/dictionary-transformer';
import { BlocksTransformer } from './transformers/blocks/blocks-transformer';
import { createBlocksWriter } from './transformers/blocks/blocks-writer';

const parseRosetta = async () => {
  const inputFileName = path.join(
    RESOURCES_DIR,
    'rosetta',
    'Whole text with IDs _ The Rosetta Stone online.html',
  );

  const passthroughStream = new PassThrough({ objectMode: true });

  consoleProgress[inputFileName].progress(`reading file "${inputFileName}"`);

  void pipeline(
    fs.createReadStream(inputFileName),
    new HtmlParser(),
    new EntityTransformer(),
    passthroughStream,
  );

  try {
    await Promise.all([
      pipeline(
        passthroughStream,
        new PartsTransformer(),
        stringify(),
        createPartsWriter(),
      ),
      pipeline(
        passthroughStream,
        new DictionaryTransformer(),
        stringify(),
        createDictionaryWriter(),
      ),
      pipeline(
        passthroughStream,
        new BlocksTransformer(),
        stringify(),
        createBlocksWriter(),
      ),
    ]);
    consoleProgress[inputFileName].success(
      `file "${inputFileName}" was successfully parsed`,
    );
  } catch (e) {
    consoleProgress[inputFileName].error(`pipeline error ${e}`);
  }
};

void parseRosetta();
