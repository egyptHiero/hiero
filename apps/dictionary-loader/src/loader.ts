import {
  consoleProgress,
  iterateDictionaryReader,
  NDJSON_SORTED_DIR,
} from '@hiero/common';
import {
  combineText,
  createDbInstance,
  DB,
  DbTable,
  DbUtils,
  DictionaryItemEntity,
  joinDictionaryItems,
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

const createMapper = (
  type: string,
): ((values: Array<string[] | string>) => TEntity) => {
  switch (type) {
    case 'dictionary':
      return (values: Array<string[]>) =>
        values
          .map(
            ([interpretation, description, transcription]) =>
              ({
                text: [combineText(interpretation, description)],
                transcription: transcription ? [transcription] : [],
              }) as DictionaryItemEntity,
          )
          .reduce<DictionaryItemEntity>((acc, value) => {
            if (!acc) {
              return value;
            }
            return joinDictionaryItems(acc, value);
          }, undefined);
    case 'signs':
      return (values) => {
        if (values.length > 1) {
          throw 'Plural values are prohibited for signs';
        }
        const [image, gardinerCodes, name, fontSize, dir] = values[0];

        return {
          image,
          gardinerCodes,
          name,
          fontSize: isNaN(Number(fontSize)) ? undefined : Number(fontSize),
          dir,
        } as SignEntity;
      };
    case 'rosetta':
      return (values) => {
        if (values.length > 1) {
          throw 'Plural values are prohibited for signs';
        }
        const [
          part,
          image,
          transliteration,
          translation,
          partTranslation,
          gardinerCodes,
        ] = values[0];

        return {
          part,
          image,
          transliteration,
          translation,
          partTranslation,
          gardinerCodes,
        } as RosettaPartEntity;
      };
    default:
      return ([value]) => {
        if (typeof value !== 'string') {
          throw `Value should be single for ${type}`;
        }
        return value as string;
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
    mapper: createMapper(reader.info.type),
    batchThreshold,
  });
  consoleProgress[fileName].success(
    `file ${fileName} was successfully loaded to db.`,
  );

  // todo: update record count
};
