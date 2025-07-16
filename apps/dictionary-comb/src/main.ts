import fs from 'node:fs';
import { consoleProgress, NDJSON_DIR } from '@hiero/common';
import { combFile } from './loader';

const params = Array.from(process.argv).slice(6);

fs.readdir(NDJSON_DIR, (err, files) =>
  files
    .filter((name) => name.endsWith('.ndjson'))
    .forEach(async (name) => {
      if (!params.length || params.some((param) => name.includes(param))) {
        try {
          consoleProgress[name].progress(`reading file ${name}`);
          combFile(name);
        } catch (e) {
          consoleProgress[name].error(`error processing ${name}: ${e}`);
        }
      }
    }),
);
