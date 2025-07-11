import { PromiseExecutor } from '@nx/devkit';
import { GenerateClientTypingsExecutorSchema } from './schema';
import openapiTS, {astToString} from "openapi-typescript";
import {writeFileSync} from "node:fs";
import * as path from "node:path";

export const host = process.env.HOST ?? 'localhost';
export const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const runExecutor: PromiseExecutor<
  GenerateClientTypingsExecutorSchema
> = async (options) => {
  console.log('Executor ran for GenerateClientTypings', options);

  console.log('Generating client api');

  try {
    const ast = await openapiTS(`http://${host}:${port}/docs/json`);
    const contents = astToString(ast);
    writeFileSync(path.join('../..', options.output), contents);
    console.log('Client api was successfully generated');
  } catch (e) {
    console.error(`${e}`);
  }

  return {
    success: true,
  };
};

export default runExecutor;
