import {Worker} from 'node:worker_threads';

export const runWorkerAsPromise = async <T extends Array<unknown>, R>(
  filename: string,
  ...params: T
) => {
  return new Promise<R>((resolve, reject) => {
    const worker = new Worker(filename, {workerData: params});

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker was stopped with exit code ${code}`));
    });
  });
};
