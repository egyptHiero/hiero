import {getSigns} from './get-signs';
import {getSign} from './get-sign';
import {postSign} from './post-sign';
import {putSign} from './put-sign';
import {DB} from '@hiero/db';
import {FastifyTypeBox} from "../../types";

export const registerSignRoutes = (fastify: FastifyTypeBox, db: DB) => {
  getSigns(fastify, db);
  getSign(fastify, db);
  postSign(fastify, db);
  putSign(fastify, db);
};
