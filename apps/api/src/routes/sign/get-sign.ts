import {DB} from '@hiero/db';
import {ParamIdFilterDto as ParamIdFilterSchema, SignDto as SignDtoSchema,} from '../../typebox';
import {toSignDto} from '../../dto';
import {FastifyTypeBox} from "../../types";

export const getSign = (fastify: FastifyTypeBox, db: DB) =>
  fastify.get(
    '/api/sign/:id',
    {
      schema: {
        description: 'get particular sign',
        tags: ['sign'],
        summary: 'get particular sign',
        params: ParamIdFilterSchema,
        response: {
          200: SignDtoSchema,
          404: {$ref: 'HttpError'},
        },
      },
    },
    async function (request, reply) {
      const {id} = request.params;

      const table = db.getSigns();
      const entity = await table.get(id);
      if (!entity) {
        return reply.notFound();
      }
      return toSignDto(id, entity);
    }
  );
