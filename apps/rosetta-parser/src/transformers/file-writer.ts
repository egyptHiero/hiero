import { consoleProgress, DictionaryMetadata } from '@hiero/common';
import fs from 'node:fs';

export const createFileWriter = (
  outputFileName: string,
  metadata: DictionaryMetadata,
) => {
  const writeStream = fs.createWriteStream(outputFileName, {
    autoClose: true,
  });

  writeStream.write(JSON.stringify(metadata));
  writeStream.write('\n');

  consoleProgress[outputFileName].progress(`writing file ${outputFileName}`);
  writeStream.on('error', () =>
    consoleProgress[outputFileName].error(
      `error writing file ${outputFileName}`,
    ),
  );
  writeStream.on('finish', () =>
    consoleProgress[outputFileName].success(
      `file ${outputFileName} was written`,
    ),
  );

  return writeStream;
};
