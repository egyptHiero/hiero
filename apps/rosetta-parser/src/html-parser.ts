import { WritableStream } from 'htmlparser2/WritableStream';
import { PassThrough } from 'stream';
import codes from './codes';

type TStep = 'done' | 'parsing' | 'start';

export const createHtmlParserStream = (passThrough: PassThrough) => {
  let step: TStep = 'start';
  const tags: string[] = [];
  let row = 0;
  let column = 0;
  const result: string[][][] = [];

  const addText = (text: string) => {
    if (!result[row]) {
      result[row] = [];
    }
    if (!result[row][column]) {
      result[row][column] = [];
    }
    result[row][column].push(text);
  };

  return new WritableStream({
    ontext(text) {
      const value = text?.trim();
      if (step === 'parsing') {
        if (value && tags.includes('td')) {
          addText(value);
        }
      }
    },
    onopentag(name, attributes) {
      if (
        step === 'start' &&
        name === 'table' &&
        attributes.class === 'glossing_table'
      ) {
        step = 'parsing';
      } else if (step === 'parsing') {
        if (row === 2 && name === 'img') {
          const parts = attributes.src?.split('/');
          if (parts) {
            addText(parts[parts.length - 1]);
          }
        } else if (row === 5 && name === 'a') {
          const parts = attributes.href?.split('&');
          if (parts?.[parts.length - 2]) {
            addText(parts[parts.length - 2].substring(3));
          }
        }
        tags.push(name);
      }
    },
    onclosetag(name) {
      if (step === 'parsing') {
        if (name === 'table') {
          step = 'done';
        } else if (name === tags[tags.length - 1]) {
          if (name === 'tr') {
            column = 0;
            row++;
          } else if (name === 'td') {
            column++;
          }
          tags.pop();
        }
      }
    },
    onend() {
      const maxLength = Math.max(...result.map((rows) => rows.length));
      for (let i = 0; i < maxLength; i++) {
        const line = result.reduce((acc, rows) => {
          acc.push(rows[i]);
          return acc;
        }, []);

        if (line[0]) {
          const id = line[0].join('');
          line?.push(codes[id] ? [codes[id]] : undefined);
          passThrough.push([
            id,
            line.slice(1).map((items, index) => {
              if (index == 4) {
                return items;
              }

              return items?.join([3, 4].includes(index) ? '' : ' ');
            }),
          ]);
        }
      }
      passThrough.push(null);
    },
  });
};
