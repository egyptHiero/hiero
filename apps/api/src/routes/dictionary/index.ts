import {getDictionary} from './get-dictionary';
import {getDictionaries} from './get-dictionaries';
import {getDictionaryInfo} from './get-dictionary-info';
import {DB} from '@hiero/db';
import {FastifyTypeBox} from "../../types";

export const registerDictionaryRoutes = (fastify: FastifyTypeBox, db: DB) => {
  getDictionary(fastify, db);
  getDictionaries(fastify, db);
  getDictionaryInfo(fastify, db);
};
