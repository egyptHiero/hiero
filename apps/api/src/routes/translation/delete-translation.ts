import { ParamIdFilterDto as ParamIdFilterSchema } from '../../generated/typebox';
import { FastifyTypeBox } from '../../types';
import { Type } from '@sinclair/typebox';

export const deleteTranslation = (fastify: FastifyTypeBox) =>
  fastify.delete(
    '/api/translation/:id',
    {
      schema: {
        description: 'delete translation',
        tags: ['translation'],
        summary: 'delete translation',
        params: ParamIdFilterSchema,
        response: {
          200: Type.Null(),
        },
      },
    },
    async function (request) {
      const { id } = request.params;
      const translations = fastify.db.getTranslations();

      return translations.del(id);
    },
  );
