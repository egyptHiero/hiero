import {DatabaseOptions as MemoryDatabaseOptions, MemoryLevel,} from 'memory-level';
import {ClassicLevel, DatabaseOptions as ClassicDatabaseOptions,} from 'classic-level';
import {DB, DbTable, TDbFormat} from './types';
import {DictionaryInfoEntity, DictionaryItemEntity, SignEntity,} from './entities';
import {DbUtils} from './db-utils';
import {AbstractLevel} from 'abstract-level/types/abstract-level';

import * as process from 'node:process';

type TDbLevel<T> = AbstractLevel<TDbFormat, string, T>;

const Exceptions = {
  DICTIONARY_EXISTS: new Error('Dictionary already exists'),
  DICTIONARY_NOT_EXISTS: new Error('Dictionary not exists'),
} as const;

const PUBLIC = 'public';

const createInMemoryDB = (
  options: MemoryDatabaseOptions<string, object> = {
    createIfMissing: true,
    storeEncoding: 'utf8',
    valueEncoding: 'json',
  }
): TDbLevel<object> => {
  return new MemoryLevel<string, object>(options);
};

const createClassicDB = (
  options: ClassicDatabaseOptions<string, object> = {
    createIfMissing: true,
    valueEncoding: 'json',
  }
): TDbLevel<object> => {
  return new ClassicLevel<string, object>('data/hiero-db', options);
};

const createDB = (): TDbLevel<object> => {
  if (process.env['NODE_ENV'] === 'test') {
    return createInMemoryDB();
  }

  return createClassicDB();
};

const sublevelOptions = {
  valueEncoding: 'json',
  keyEncoding: 'utf8',
};

export const createDbInstance = async (): Promise<DB> => {
  const db = createDB();
  await db.open();

  const hieroglyphs = db.sublevel<string, string>(
    'hieroglyphs',
    sublevelOptions
  );

  const signs = db.sublevel<string, SignEntity>('signs', sublevelOptions);

  const dictionaries = db.sublevel<string, DictionaryItemEntity>(
    'dictionaries',
    sublevelOptions
  );

  const dictionaryInfo = db.sublevel<string, DictionaryInfoEntity>(
    'info',
    sublevelOptions
  );

  const getDictionaryInfo: DB['getDictionaryInfo'] = (user = PUBLIC) =>
    dictionaryInfo.sublevel(user, sublevelOptions);

  const getDictionary: DB['getDictionary'] = async (name, user = PUBLIC) => {
    if (await DbUtils.hasKey(getDictionaryInfo(user), name)) {
      const userDictionaries: DbTable<DictionaryItemEntity> =
        dictionaries.sublevel(user, sublevelOptions);

      return userDictionaries.sublevel(name, sublevelOptions);
    }

    throw Exceptions.DICTIONARY_NOT_EXISTS;
  };

  return {
    hieroglyphs,

    getSigns: (user = PUBLIC) => signs.sublevel(user, sublevelOptions),
    getDictionaryInfo,
    getDictionary,
    createDictionary: async (info, user, options = {}) => {
      const defaultOptions: Required<typeof options> = {
        canOverride: false,
      };
      const {canOverride} = Object.assign(defaultOptions, options);

      const userDictionaryInfo = getDictionaryInfo(user);
      const tableExists = await DbUtils.hasKey(userDictionaryInfo, info.name);
      if (tableExists && !canOverride) {
        throw Exceptions.DICTIONARY_EXISTS;
      }

      await userDictionaryInfo.put(info.name, info);
      const dictionary = await getDictionary(info.name, user);

      if (canOverride) {
        await dictionary.clear();
      }

      return dictionary;
    },
    removeDictionary: async (name, user) => {
      const userDictionaryInfo = getDictionaryInfo(user);
      const userDictionary = await getDictionary(name, user);

      await Promise.all([userDictionaryInfo.del(name), userDictionary.clear()]);
    },

    close: () => db.close(),
  };
};
