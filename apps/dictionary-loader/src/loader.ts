import { consoleProgress, iterateDictionaryReader, NDJSON_DIR } from '@hiero/common';
import { createDbInstance, DB, DbTable, DbUtils } from '@hiero/db';
import { parse } from 'ndjson';
import * as fs from 'node:fs';
import path from "node:path";

export const dbPromise = createDbInstance();
type TInfo = Awaited<ReturnType<typeof iterateDictionaryReader>>['info'];

const openTable: (db: DB, props: TInfo) => Promise<DbTable<any>> = async (
  db,
  { type, name, user, ...rest }
) => {
  switch (type) {
    case 'dictionary':
      return await db.createDictionary({ name, ...rest }, user, {
        canOverride: true,
      });
    case 'hieroglyphs':
      await db.hieroglyphs.clear();
      return db.hieroglyphs;
    case 'signs': {
      const signs = await db.getSigns(user);
      await signs.clear();
      return signs;
    }
    default:
      throw new Error(`Unexpected type: ${type}`);
  }
};

export const fillTableFromFile = async (
  fileName: string
) => {
  const db = await dbPromise;
  const fullFileName = path.join(NDJSON_DIR, fileName);
  const reader = await iterateDictionaryReader(
    fs
      .createReadStream(fullFileName, { autoClose: true })
      .pipe(parse())
  );
  const table = await openTable(db, reader.info);
  // todo: remove any
  await DbUtils.update(table, reader.iterator as any);
  consoleProgress[fileName].success(`file ${fileName} was successfully loaded to db.`);

  // todo: update record count
};
