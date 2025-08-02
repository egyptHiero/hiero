import { DB, DbUtils } from '@hiero/db';
import {
  TranslationDto as TranslationDtoSchema,
  TranslationNewDto as TranslationNewDtoSchema,
} from '../../generated/typebox';
import { toTranslationDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const postTranslation = (fastify: FastifyTypeBox, db: DB) =>
  fastify.post<{
    Body: TranslationNewDtoSchema;
  }>(
    '/api/translation',
    {
      schema: {
        description: 'create new translation',
        tags: ['translation'],
        summary: 'create new translation',
        body: TranslationNewDtoSchema,
        response: {
          200: TranslationDtoSchema,
        },
      },
    },
    async function (request) {
      const translations = db.getTranslations();
      const id = await DbUtils.getUniqueId(translations);
      const translation = request.body;

      return translations
        .put(id, translation)
        .then(async () => toTranslationDto(id, await translations.get(id)));
    },
  );
