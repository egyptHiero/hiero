import { getHieroglyph } from './get-hieroglyph';
import { FastifyTypeBox } from '../../types';

export const registerHieroglyphs = (fastify: FastifyTypeBox) => {
  getHieroglyph(fastify);
};
