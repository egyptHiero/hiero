import { getTranslations } from './get-translations';
import { getTranslation } from './get-translation';
import { postTranslation } from './post-translation';
import { putTranslation } from './put-translation';
import { FastifyTypeBox } from '../../types';
import { deleteTranslation } from './delete-translation';

export const registerTranslationRoutes = (fastify: FastifyTypeBox) => {
  getTranslations(fastify);
  getTranslation(fastify);
  postTranslation(fastify);
  putTranslation(fastify);
  deleteTranslation(fastify);
};
