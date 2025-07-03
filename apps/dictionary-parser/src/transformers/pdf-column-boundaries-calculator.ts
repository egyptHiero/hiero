import { Transform, TransformCallback } from 'node:stream';
import { PDFExtractText } from 'pdf.js-extract';
import EventEmitter from 'node:events';

interface TGroup {
  x1: number;
  x2: number;
}

const isInGroup = (group: TGroup, x1: number, x2: number) => {
  return x2 >= group.x1 && x1 <= group.x2;
};

const getSortedGroups = (groups: TGroup[]) => {
  const result = groups.map(({ x1, x2 }) => [Math.round(x1), Math.round(x2)]);
  result.sort((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
  return result;
};

/**
 * Calculates boundaries of a table.
 *
 * This class can be used to get approximate boundaries to use in PdfParseTableProcessor
 */
export class PdfColumnBoundariesCalculator extends Transform {
  public readonly events = new EventEmitter();
  private groups: TGroup[] = [];

  constructor() {
    super({ objectMode: true });
  }

  override _transform(
    chunk: PDFExtractText,
    _encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    try {
      if (chunk?.width && chunk?.height && !!chunk?.str.trim()) {
        const foundGroups = this.groups.filter((g) =>
          isInGroup(g, chunk.x, chunk.x + chunk.width)
        );

        if (foundGroups.length) {
          const x1 = Math.min(chunk.x, ...foundGroups.map((g) => g.x1));
          const x2 = Math.max(
            chunk.x + chunk.width,
            ...foundGroups.map((g) => g.x2)
          );

          this.groups = this.groups.reduce(
            (acc, g) => {
              if (!foundGroups.includes(g)) {
                acc.push(g);
              }
              return acc;
            },
            [{ x1, x2 }]
          );
        } else {
          this.groups.push({ x1: chunk.x, x2: chunk.x + chunk.width });
        }
      }

      callback();
    } catch (e) {
      callback(e as Error);
    }
  }

  override _flush(callback: TransformCallback) {
    this.events.emit('groups', getSortedGroups(this.groups));
    super._flush?.(callback);
  }
}
