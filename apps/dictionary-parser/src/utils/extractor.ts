import {PDFExtract, PDFExtractOptions, PDFExtractResult,} from 'pdf.js-extract';
import {consoleProgress} from '@hiero/common';
import {TPdfParseProcessor} from '../types';
import {PassThrough} from 'node:stream';
import {createPipeline} from './pipeline-helper';
import {runWorkerAsPromise} from "./worker-as-promise";
import path from "node:path";

const isWithWorkers = true;
const workerPath = path.join(__dirname, 'worker.js');

export const extract = async (
  fileName: string,
  options: PDFExtractOptions,
  ...processors: Array<TPdfParseProcessor<unknown>>
) => {
  try {
    consoleProgress[fileName].progress(`reading input file ${fileName}`);

    const promise = isWithWorkers ? runWorkerAsPromise<[string, PDFExtractOptions], PDFExtractResult>(
      workerPath,
      fileName,
      options
    ) : new PDFExtract().extract(fileName, options);

    const writer = new PassThrough({objectMode: true});

    return promise
      .then(async (data) => {
        consoleProgress[fileName].progress(`parsing input file ${fileName}`);
        data.pages.forEach((page) => {
          page.content.forEach((item) => {
            writer.write(item);
          });
        });

        writer.end();
      })
      .then(() => {
        return Promise.all(
          processors.map((processor) => createPipeline(writer, processor))
        );
      })
      .then(() => {
        consoleProgress[fileName].success(`finished parsing input file ${fileName}`);
      });
  } catch (e) {
    consoleProgress[fileName].error(
      `error processing file ${fileName}: ${e}`
    );
    throw e;
  }
};
