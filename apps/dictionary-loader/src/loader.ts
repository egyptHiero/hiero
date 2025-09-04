import {
  consoleProgress,
  iterateDictionaryReader,
  NDJSON_SORTED_DIR,
} from '@hiero/common';
import {
  createDbInstance,
  DB,
  DbTable,
  DbUtils,
  DictionaryItemEntity,
  RosettaPartEntity,
  SignEntity,
} from '@hiero/db';
import { parse } from 'ndjson';
import * as fs from 'node:fs';
import path from 'node:path';

export const dbPromise = createDbInstance();
type TInfo = Awaited<ReturnType<typeof iterateDictionaryReader>>['info'];
type TEntity = DictionaryItemEntity | SignEntity | RosettaPartEntity | string;

const openTable: (
  db: DB,
  force: boolean,
  props: TInfo,
) => Promise<DbTable<TEntity>> = async (
  db,
  force,
  { type, name, user, ...restInfo },
) => {
  switch (type) {
    case 'dictionary':
      return await db.createDictionary({ name, ...restInfo }, user, {
        canOverride: force,
      });
    case 'hieroglyphs':
      if (force) {
        await db.hieroglyphs.clear();
      }
      return db.hieroglyphs;
    case 'signs': {
      const signs = db.getSigns(user);
      if (force) {
        await signs.clear();
      }
      return signs;
    }
    case 'rosetta': {
      const rosetta = db.getRosetta(user);
      if (force) {
        await rosetta.clear();
      }
      return rosetta;
    }
    default:
      throw new Error(`Unexpected type: ${type}`);
  }
};

const getMapper = (type: string): ((values: string[]) => TEntity) => {
  switch (type) {
    case 'dictionary':
      return (values) =>
        values.map(([interpretation, description, transcription]) => ({
          interpretation,
          description,
          transcription,
        }));
    case 'signs':
      return (values): SignEntity =>
        values.map(([image, gardinerCodes, name, fontSize, dir]) => ({
          image,
          gardinerCodes,
          name,
          fontSize: isNaN(Number(fontSize)) ? undefined : Number(fontSize),
          dir,
        }))[0];
    case 'rosetta':
      return (values): RosettaPartEntity =>
        values.map(
          ([
            part,
            image,
            transliteration,
            translation,
            partTranslation,
            gardinerCodes,
          ]) => ({
            part,
            image,
            transliteration,
            translation,
            partTranslation,
            gardinerCodes,
          }),
        )[0];
    default:
      return (values) => {
        if (values.length > 1) {
          throw new Error(`Incorrect values ${values} for type ${type}`);
        }
        return values[0];
      };
  }
};

export const fillTableFromFile = async (
  fileName: string,
  batchThreshold?: number,
) => {
  const db = await dbPromise;
  const fullFileName = path.join(NDJSON_SORTED_DIR, fileName);
  const reader = await iterateDictionaryReader<[string, string | string[]]>(
    fs.createReadStream(fullFileName, { autoClose: true }).pipe(parse()),
  );

  // todo: add force parameter
  const table = await openTable(db, true, reader.info);
  await DbUtils.update(table, reader.iterator, {
    mapper: getMapper(reader.info.type),
    batchThreshold,
  });
  consoleProgress[fileName].success(
    `file ${fileName} was successfully loaded to db.`,
  );

  // todo: update record count
};
