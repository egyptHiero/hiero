import { Transform } from 'node:stream';
import { DomHandler, Parser } from 'htmlparser2';
import codes from '../codes';

type Handler =
  | Partial<DomHandler>
  | {
      tags: string[];
      isActive?: boolean;
      row: number;
      col: number;
      arr: string[][][];
      currentAttributes: Record<string, string>;
    };

interface THandler {
  handler: Handler;
}

const getColspan = (value?: string) => {
  const n = Number.parseInt(value);
  return isNaN(n) ? 1 : n;
};

export class HtmlParser extends Transform implements THandler {
  constructor() {
    super({ objectMode: true });
  }

  handler = {
    isActive: undefined,
    tags: [],
    row: 0,
    col: 0,
    arr: [],
    currentAttributes: undefined,
    onopentag(name, attributes) {
      this.currentAttributes = attributes;
      if (
        name === 'table' &&
        attributes.class === 'glossing_table' &&
        this.isActive === undefined
      ) {
        this.isActive = true;
      } else {
        if (this.isActive) {
          this.tags.push(name);
        }
      }

      switch (this.row) {
        case 1:
          // id
          break;
        case 2:
          // image
          if (name === 'img') {
            const parts = attributes.src?.split('/');
            if (parts) {
              this.ontext(parts[parts.length - 1]);
            }
          }
          break;
        case 5:
          if (name === 'a') {
            const parts = attributes.href?.split('&');
            if (parts?.[parts.length - 2]) {
              this.ontext(parts[parts.length - 2].substring(3));
            }
          }
          break;
      }
    },
    ontext(data) {
      if (data && this.isActive && this.tags.includes('td')) {
        const col = this.col;
        const row = this.row;

        if (!this.arr[row]) {
          this.arr[row] = [];
        }
        if (!this.arr[row][col]) {
          this.arr[row][col] = [];
        }
        this.arr[row][col].push(data);
      }
    },
    onclosetag(name) {
      if (this.isActive) {
        if (this.tags[this.tags.length - 1] === name) {
          this.tags.pop();
        }

        switch (name) {
          case 'table':
            this.isActive = false;
            break;
          case 'tr':
            this.col = 0;
            this.row++;
            break;
          case 'td':
            this.col += getColspan(this.currentAttributes?.colspan);
            break;
        }
      }
    },
  };

  htmlparser = new Parser(this.handler);

  _transform(chunk, encoding, callback): void {
    this.htmlparser.write(chunk.toString());
    callback();
  }

  _flush(callback) {
    const arr = this.handler.arr.filter((v) => !!v);
    const maxLength = arr[0].length;
    for (let i = 0; i < maxLength; i++) {
      const line = arr.reduce((acc, rows) => {
        acc.push(rows[i]);
        return acc;
      }, []);

      if (line?.[0]) {
        line.push([codes[line[0]]]);
      }

      this.push(line);
    }
    callback();
  }
}
