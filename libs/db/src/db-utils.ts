import { DbTable } from './types';
import ShortUniqueId from 'short-unique-id';
import { combineWithDefaults } from '@hiero/common';

export const DEFAULT_PAGE_SIZE = 25;
const MAX_ITERATIONS_FOR_UNIQUE_ID = 3;
const uid = new ShortUniqueId({ length: 6 });

const hasKey = async <T>(table: DbTable<T>, key: string) => {
  for await (const _ of table.iterator({ gte: key, lte: key, limit: 1 })) {
    return true;
  }
  return false;
};

export type GetPageProps<T, R = T> = {
  pageSize: number;
  from: string;
  to: string;
  filter: (key: string, value: T) => boolean;
  mapper: (key: string, value: T) => R;
};

async function getPage<T, R = T>(
  table: DbTable<T>,
  props: Partial<GetPageProps<T, R>> = {}
): Promise<Array<R>> {
  const defaultProps: GetPageProps<T, T> = {
    pageSize: DEFAULT_PAGE_SIZE,
    from: '',
    to: '~',
    filter: () => true,
    mapper: (_key, value) => value,
  };

  const { pageSize, from, to, filter, mapper } = combineWithDefaults(
    props,
    defaultProps as unknown as GetPageProps<T, R>,
  );

  const result: Array<R> = [];
  for await (const [key, value] of table.iterator({
    gt: from,
    lte: to,
  })) {
    if (filter(key, value)) {
      result.push(mapper(key, value));
    }

    if (pageSize > 0 && result.length >= pageSize) {
      break;
    }
  }

  return result;
}

const getSize = async <T>(table: DbTable<T>): Promise<number> => {
  let count = 0;
  for await (const _ of table.iterator({ keys: true, values: false })) {
    count++;
  }
  return count;
};

const getUniqueId = async <T>(table: DbTable<T>): Promise<string> => {
  for (let n = 0; n < MAX_ITERATIONS_FOR_UNIQUE_ID; n++) {
    const id = uid.rnd();
    if (!(await hasKey(table, id))) {
      return id;
    }
  }

  throw new Error(`Could not obtain the unique id for ${table.prefix}`);
};

interface UpdateOptions {
  batchThreshold: number;
}

async function* createBundles<T>(
  iterator: AsyncIterable<[string, T]> | Iterable<[string, T]>,
  batchThreshold: number
): AsyncGenerator<Array<[string, T]>, void, void> {
  let bundle: Array<[string, T]> = [];
  for await (const item of iterator) {
    bundle.push(item);
    if (bundle.length >= batchThreshold) {
      yield bundle;
      bundle = [];
    }
  }
  if (bundle.length > 0) yield bundle;
}

const update = async <T>(
  table: DbTable<T>,
  iterator: AsyncIterable<[string, T]> | Iterable<[string, T]>,
  options: Partial<UpdateOptions> = {}
): Promise<void> => {
  const defaultOptions: UpdateOptions = { batchThreshold: 1000 };
  const { batchThreshold } = combineWithDefaults(options, defaultOptions);

  for await (const bundle of createBundles(iterator, batchThreshold)) {
    const batch = table.batch();
    bundle.forEach(([key, value]) => {
      batch.put(key, value);
    });
    await batch.write();
  }
};

export const DbUtils = {
  /**
   * Checks the existence of the key in the table.
   *
   * @param table
   * @param key
   */
  hasKey,
  /**
   * Returns page from the table.
   *
   * @param table
   * @param props               - properties
   *   @param props.pageSize    - page size, by default 25
   *   @param props.from        - first key to start with (not including - gt)
   *   @param props.to          - last key to stop after (including - lte)
   *   @param props.filter      - filter function
   *   @param props.mapper      - mapper function, by default returns values
   */
  getPage,
  /**
   * Returns size of the table.
   *
   * @param table
   */
  getSize,
  /**
   * Returns unique id (with length 6) and ensures that there are no such a key.
   *
   * @param table
   */
  getUniqueId,
  /**
   * Fill table with .
   *
   * @param table
   * @param iterator                    async or plain iterator
   * @param options                     options:
   *  @param options.batchThreshold     batch threshold, by default 1000
   */
  update,
} as const;
