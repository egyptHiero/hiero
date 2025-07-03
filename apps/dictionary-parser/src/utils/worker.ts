import {parentPort, workerData} from "node:worker_threads";
import {PDFExtract} from "pdf.js-extract";

const [fileName, options] = workerData;

new PDFExtract()
  .extract(fileName, options)
  .then((data) => parentPort.postMessage(data));
