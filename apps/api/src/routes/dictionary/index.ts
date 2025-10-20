import { getDictionary } from './get-dictionary';
import { getDictionaries } from './get-dictionaries';
import { getDictionaryInfo } from './get-dictionary-info';
import { FastifyTypeBox } from '../../types';
import { postDictionaryChains } from './post-dictionary-chains';
import { getDictionaryExport } from './get-dictionary-export';

export const registerDictionaryRoutes = (fastify: FastifyTypeBox) => {
  getDictionary(fastify);
  getDictionaries(fastify);
  getDictionaryInfo(fastify);
  postDictionaryChains(fastify);
  getDictionaryExport(fastify);
};
