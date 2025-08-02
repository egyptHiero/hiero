import { getTranslations } from './get-translations';
import { getTranslation } from './get-translation';
import { postTranslation } from './post-translation';
import { putTranslation } from './put-translation';
import { DB } from '@hiero/db';
import { FastifyTypeBox } from '../../types';
import { deleteTranslation } from './delete-translation';

export const registerTranslationRoutes = (fastify: FastifyTypeBox, db: DB) => {
  getTranslations(fastify, db);
  getTranslation(fastify, db);
  postTranslation(fastify, db);
  putTranslation(fastify, db);
  deleteTranslation(fastify, db);
};
