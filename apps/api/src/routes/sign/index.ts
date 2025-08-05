import { getSigns } from './get-signs';
import { getSign } from './get-sign';
import { postSign } from './post-sign';
import { putSign } from './put-sign';
import { FastifyTypeBox } from '../../types';
import { deleteSign } from './delete-sign';

export const registerSignRoutes = (fastify: FastifyTypeBox) => {
  getSigns(fastify);
  getSign(fastify);
  postSign(fastify);
  putSign(fastify);
  deleteSign(fastify);
};
