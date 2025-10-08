import { FastifyTypeBox } from '../../types';

import { getRosettaParts } from './get-rosetta-parts';
import { getRosettaPart } from './get-rosetta-part';
import { putRosettaCodes } from './put-rosetta-codes';
import { getRosettaCodes } from './get-rosetta-codes';
import { getRosettaBlocks } from './get-rosetta-blocks';
import { getRosettaBlock } from './get-rosetta-block';

export const registerRosettaRoutes = (fastify: FastifyTypeBox) => {
  getRosettaParts(fastify);
  getRosettaPart(fastify);
  getRosettaCodes(fastify);
  putRosettaCodes(fastify);
  getRosettaBlocks(fastify);
  getRosettaBlock(fastify);
};
