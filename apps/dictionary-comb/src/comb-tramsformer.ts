import { Transform } from 'node:stream';

const compare = (a: string[], b: string): number => {
  if (!a[0]) {
    return !b[0] ? 0 : 1;
  }
  const result = a[0].localeCompare(b[0]);

  if (result === 0) {
    return JSON.stringify(a).localeCompare(JSON.stringify(b));
  }

  return result;
};

/**
 * Sorting, removing duplicates, and merging values for identical keys.
 */
export class CombTransformer extends Transform {
  private lines: string[] = [];

  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    this.lines.push(chunk);
    callback();
  }

  _flush(callback) {
    this.lines
      .sort((a, b) =>
        Array.isArray(a) && Array.isArray(b) ? compare(a, b) : 1,
      )
      .reduce((acc, value, n, arr) => {
        const stringifiedValue = JSON.stringify(value);
        const previous = acc[acc.length - 1];
        if (JSON.stringify(arr[n - 1]) !== stringifiedValue) {
          if (Array.isArray(value) && Array.isArray(previous)) {
            const [key, ...values] = value;
            const [previousKey] = previous;

            if (key === previousKey) {
              previous.push(...values);
              return acc;
            }
          }
          acc.push(value);
        }
        return acc;
      }, [])
      .forEach((line) => this.push(line));
    callback();
  }
}
