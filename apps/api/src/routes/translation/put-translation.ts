import {
  ParamIdFilterDto as ParamIdFilterSchema,
  TranslationDto as TranslationDtoSchema,
  TranslationNewDto as TranslationNewDtoSchema,
} from '../../generated/typebox';
import { toIdentifiableDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const putTranslation = (fastify: FastifyTypeBox) =>
  fastify.put(
    '/api/translation/:id',
    {
      schema: {
        description: 'update translation',
        tags: ['translation'],
        summary: 'update translation',
        params: ParamIdFilterSchema,
        body: TranslationNewDtoSchema,
        response: {
          200: TranslationDtoSchema,
        },
      },
    },
    async function (request) {
      const { id } = request.params;
      const translation = request.body;
      const translations = fastify.db.getTranslations();

      return translations
        .put(id, translation)
        .then(async () => toIdentifiableDto(id, await translations.get(id)));
    },
  );
