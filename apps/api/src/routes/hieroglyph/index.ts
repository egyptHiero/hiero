import {DB} from '@hiero/db';
import {getHieroglyph} from './get-hieroglyph';
import {FastifyTypeBox} from "../../types";

export const registerHieroglyphs = (fastify: FastifyTypeBox, db: DB) => {
  getHieroglyph(fastify, db);
};
