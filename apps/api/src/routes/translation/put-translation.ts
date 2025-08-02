import { DB } from '@hiero/db';
import {
  ParamIdFilterDto as ParamIdFilterSchema,
  TranslationDto as TranslationDtoSchema,
  TranslationNewDto as TranslationNewDtoSchema,
} from '../../generated/typebox';
import { toTranslationDto } from '../../dto';
import { ParamIdFilterDto, TranslationDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const putTranslation = (fastify: FastifyTypeBox, db: DB) =>
  fastify.put<{
    Params: ParamIdFilterDto;
    Body: TranslationDto;
  }>(
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
      const translations = db.getTranslations();

      return translations
        .put(id, translation)
        .then(async () => toTranslationDto(id, await translations.get(id)));
    },
  );
