import { Transform } from 'stream';

interface DictionaryInfo {
  name: string;
  language: string;
  type: string;
  user?: string;
}

const isDictionaryInfo = (
  data: unknown
): data is DictionaryInfo => {
  const dictionary = data as DictionaryInfo;

  return !!dictionary.name && !!dictionary.language && !!dictionary.type;
};

type TIterateDictionaryReader = (readStream: Transform) => Promise<{
  info: DictionaryInfo;
  iterator: AsyncGenerator;
}>;

/**
 * Returns iterates through a stream extracting meta-information from the first line.
 *
 * @param readStream
 * @returns record
 * @returns record.info       - meta-information
 * @returns record.iterator   - async iterator
 */
export const iterateDictionaryReader: TIterateDictionaryReader = async (
  readStream
) => {
  const iterator = (async function* () {
    for await (const chunk of readStream) {
      yield chunk;
    }
  })();
  const firstChunk = await iterator.next();
  if (firstChunk.done) {
    throw new Error('No data');
  }

  if (!isDictionaryInfo(firstChunk.value)) {
    throw new Error('Invalid metadata');
  }

  return { info: firstChunk.value as DictionaryInfo, iterator };
};

/**
 * Creates async iterator from array.
 *
 * @param data        - array of data
 */
export async function* asyncIterator<T>(data: T[]) {
  for (const item of data) {
    yield item;
  }
}
