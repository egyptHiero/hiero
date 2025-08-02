import { DB } from '@hiero/db';
import {
  ParamIdFilterDto as ParamIdFilterSchema,
  TranslationDto as TranslationDtoSchema,
} from '../../generated/typebox';
import { toTranslationDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const getTranslation = (fastify: FastifyTypeBox, db: DB) =>
  fastify.get(
    '/api/translation/:id',
    {
      schema: {
        description: 'get particular translation',
        tags: ['translation'],
        summary: 'get particular translation',
        params: ParamIdFilterSchema,
        response: {
          200: TranslationDtoSchema,
          404: { $ref: 'HttpError' },
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;

      const table = db.getTranslations();
      const entity = await table.get(id);
      if (!entity) {
        return reply.notFound();
      }
      return toTranslationDto(id, entity);
    },
  );
