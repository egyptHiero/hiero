import RegisterSwagger from './plugins/swagger';
import RegisterSensible from './plugins/sensible';
import routes from './routes';
import Fastify from 'fastify';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Generates OpenAPI json schema and save it to fileName.
 * @param fileName  - file to save the schema.
 */
export const generateSchema = async (fileName: string) => {
  const server = Fastify({
    logger: true,
  });

  RegisterSwagger(server);
  RegisterSensible(server);
  server.register(routes);

  await server.ready();

  const dir = path.dirname(fileName);
  fs.mkdirSync(dir, { recursive: true });
  const schema = JSON.stringify(server.swagger());
  fs.writeFileSync(fileName, schema);
  console.log(`✅ Swagger schema saved to ${fileName}`);
};
