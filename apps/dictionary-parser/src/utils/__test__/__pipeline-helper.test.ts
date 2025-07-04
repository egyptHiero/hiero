import {PassThrough} from "node:stream";
import {TPdfParseProcessor} from "../../types";
import {PDFExtractText} from "pdf.js-extract";
import {DictionaryMetadata} from "@hiero/common";
import {createPipeline} from "../pipeline-helper";
import fs from "node:fs";

const [firstChunk, secondChunk, essentialChunk] = ['first', 'second', 'essential'].map<PDFExtractText>(str => ({str} as PDFExtractText))

describe('', () => {
  it('should ', async () => {
    const resultStream = new PassThrough();

    vi.spyOn(fs, 'createWriteStream').mockImplementation(() => {
      return resultStream as unknown as fs.WriteStream;
    });

    const writer = new PassThrough({objectMode: true});
    const processor: TPdfParseProcessor<string> = {
      convert(buffer) {
        return buffer.map(({str}) => str).join('-');
      },
      getDictionaryMetadata() {
        return {} as DictionaryMetadata;
      },
      getObjectMode() {
        return true;
      },
      getOutputFileName() {
        return "test";
      },
      isEssential(chunk) {
        return chunk !== essentialChunk;
      },
      isNewLine(chunk): boolean {
        return chunk === firstChunk;
      }
    };

    [essentialChunk, firstChunk, essentialChunk, secondChunk, essentialChunk, essentialChunk, firstChunk].forEach(chunk => writer.push(chunk));
    createPipeline(writer, processor);
    writer.end();

    let result = '';
    for await (const chunk of resultStream) {
      result += chunk.toString();
    }

    expect(result).toStrictEqual(['{}', '"first-second"', '"first"', ''].join('\n'));
  });
});
