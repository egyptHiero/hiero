import { FastifyTypeBox } from '../../types';

import { getRosettaParts } from './get-rosetta-parts';
import { getRosettaPart } from './get-rosetta-part';
import { putRosettaCodes } from './put-rosetta-codes';
import { getRosettaCodes } from './get-rosetta-codes';

export const registerRosettaRoutes = (fastify: FastifyTypeBox) => {
  getRosettaParts(fastify);
  getRosettaPart(fastify);
  getRosettaCodes(fastify);
  putRosettaCodes(fastify);
};
