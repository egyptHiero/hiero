import { DbTable } from '@hiero/db';
import { PassThrough } from 'node:stream';

export const exportAsStream = <T>(
  table: DbTable<T>,
  mapper: (id: string, value: T) => string,
) => {
  const stream = new PassThrough();

  process.nextTick(async () => {
    try {
      for await (const [key, value] of table.iterator({
        keys: true,
        values: true,
      })) {
        const chunk = mapper(key, value);

        if (!stream.write(chunk)) {
          const waitForDrain = () =>
            new Promise((resolve) => {
              stream.once('drain', resolve);
            });

          await waitForDrain();
        }
      }

      stream.end();
    } catch (error) {
      console.error(error);
      stream.destroy(error);
    }
  });

  return stream;
};
