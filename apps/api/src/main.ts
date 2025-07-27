import * as process from 'node:process';
import { generateSchema } from './generate-schema';
import { startServer } from './start-server';

const args = process.argv.slice(2);

/**
 * Starter for fastify server. With `--generate-schema file` parameters saves OpenAPI json schema to given file.
 */
const main = async () => {
  const generateIndex = args.indexOf('--generate-schema');
  if (generateIndex >= 0 && args.length > generateIndex) {
    void generateSchema(args[generateIndex + 1]);
  } else if (args.length) {
    console.log('Invalid parameters: ', args.join(','));
  } else {
    void startServer();
  }
};

void main();
