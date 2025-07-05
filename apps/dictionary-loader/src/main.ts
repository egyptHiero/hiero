import {consoleProgress, NDJSON_DIR} from '@hiero/common';
import {fillTableFromFile} from './loader';
import fs from 'node:fs';

interface DbError extends Error {
  code: string;
  cause?: DbError;
}

const params = Array.from(process.argv).slice(6);

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return (error as DbError)?.cause?.code === 'LEVEL_LOCKED'
      ? 'Database is locked'
      : error.message;
  } else {
    return error?.toString();
  }
};

fs.readdir(NDJSON_DIR, (err, files) =>
  files
    .filter((name) => name.endsWith('.ndjson'))
    .forEach(async (name) => {
      if (!params.length || params.some((param) => name.includes(param))) {
        try {
          consoleProgress[name].progress(`reading file ${name}`);
          await fillTableFromFile(name);
        } catch (e) {
          consoleProgress[name].error(
            `error processing ${name}: ${getErrorMessage(e)}`
          );
        }
      }
    })
);
