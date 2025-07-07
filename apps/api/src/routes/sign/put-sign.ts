import {DB} from '@hiero/db';
import {ParamIdFilterDto as ParamIdFilterSchema, SignDto as SignDtoSchema,} from '../../typebox';
import {toSignDto} from '../../dto';
import {ParamIdFilterDto, SignDto} from '../../dto';
import {FastifyTypeBox} from "../../types";

export const putSign = (fastify: FastifyTypeBox, db: DB) =>
  fastify.put<{
    Params: ParamIdFilterDto;
    Body: SignDto;
  }>(
    '/api/sign/:id',
    {
      schema: {
        description: 'update sign',
        tags: ['sign'],
        summary: 'update sign',
        params: ParamIdFilterSchema,
        body: SignDtoSchema,
        response: {
          200: SignDtoSchema,
        },
      },
    },
    async function (request) {
      const {id} = request.params;
      const sign = request.body;
      const signs = db.getSigns();

      return signs
        .put(id, sign)
        .then(async () => toSignDto(id, await signs.get(id)));
    }
  );
