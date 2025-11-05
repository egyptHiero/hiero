import { ParamIdFilterDto as ParamIdFilterSchema } from '../../generated/typebox';
import { FastifyTypeBox } from '../../types';
import { dictionaryItem2Json } from '@hiero/db';
import { exportAsStream } from '../../logics/export-as-stream';

export const getDictionaryExport = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/dictionary/:id/export',
    {
      schema: {
        description: 'export dictionary',
        tags: ['dictionary', 'export'],
        summary: 'export dictionary',
        params: ParamIdFilterSchema,
        produces: ['application/x-ndjson'],
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const table = await fastify.db.getDictionary(id);
      const info = await fastify.db.getDictionaryInfo().get(id);
      const stream = exportAsStream(table, dictionaryItem2Json);

      stream.write(`${JSON.stringify(info)}\n`);

      await reply
        .header('Transfer-Encoding', 'chunked')
        .header('Content-Type', 'application/x-ndjson')
        .header(
          'Content-Disposition',
          `attachment; filename="${id}_${info.language}.jsonl"`,
        )
        .send(stream);
    },
  );
