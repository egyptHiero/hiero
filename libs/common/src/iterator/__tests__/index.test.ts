import { asyncIterator, iterateDictionaryReader } from '../index';
import { parse } from 'ndjson';
import type { Transform } from 'stream';

const createNdjsonStream = (data: unknown[]): Transform => {
  const parser = parse();

  data.forEach((item) => {
    parser.write(JSON.stringify(item) + '\n');
  });
  parser.end();

  return parser;
};

describe('iterateDictionaryReader', () => {
  it('should throw No data error with no data', async () => {
    await expect(
      iterateDictionaryReader(createNdjsonStream([]))
    ).rejects.toThrow('No data');
  });

  it('should throw Invalid metadata error with invalid metadata', async () => {
    await expect(
      iterateDictionaryReader(createNdjsonStream([{}]))
    ).rejects.toThrow('Invalid metadata');
  });

  it('should return empty iterator for metadata only', async () => {
    const info = { name: 'test', language: 'en', type: 'dictionary' };
    const data = await iterateDictionaryReader(createNdjsonStream([info]));
    expect(data.info).toStrictEqual(info);
    expect(await data.iterator.next()).toStrictEqual(
      expect.objectContaining({ done: true })
    );
  });

  it('should return empty iterator through expected values', async () => {
    const info = { name: 'test', language: 'en', type: 'dictionary' };
    const records = [
      [{ interpretation: 'a1' }],
      [{ interpretation: 'a2' }],
      [{ interpretation: 'a3' }],
    ];
    const data = await iterateDictionaryReader(
      createNdjsonStream([info, ...records])
    );
    expect(data.info).toStrictEqual(info);

    const fn = vi.fn();
    for await (const item of data.iterator) {
      fn(item);
    }

    expect(fn.mock.calls).toEqual(records.map(r => ([r])));
  });
});

describe('asyncIterator', () => {
  it('should ', async () => {
    const iterator = asyncIterator([1, 2, 3]);

    const fn = vi.fn();
    for await (const item of iterator) {
      await fn(item);
    }

//    expect(fn.mock.calls).toEqual([[1], [2], [3]]);
  });
});
