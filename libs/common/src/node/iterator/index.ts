import { Transform } from 'node:stream';
import { DictionaryMetadata } from '../../interfaces';

const isDictionaryMetadata = (data: unknown): data is DictionaryMetadata => {
  const dictionary = data as DictionaryMetadata;

  return !!dictionary.name && !!dictionary.language && !!dictionary.type;
};

type TIterateDictionaryReader = <T>(readStream: Transform) => Promise<{
  info: DictionaryMetadata;
  iterator: AsyncGenerator<T>;
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
  readStream,
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

  if (!isDictionaryMetadata(firstChunk.value)) {
    throw new Error('Invalid metadata');
  }

  return { info: firstChunk.value as DictionaryMetadata, iterator };
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
