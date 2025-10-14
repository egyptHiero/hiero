import { useMutation, useQuery } from '@tanstack/react-query';
import { useClientContext } from '../../app/context/client-context';
import { ClippedImageDto } from '../../types';

export const useGetRosettaBlock = (id: string | undefined) => {
  const { client } = useClientContext();

  return useQuery({
    queryKey: ['rosetta-item', id],
    queryFn: () =>
      id
        ? client.path('/api/rosetta/block/{id}').method('get').create()({ id })
        : undefined,
    select: (response) => {
      if (response?.data && !response?.data.images) {
        response.data.images = [
          { src: 'rosetta/rosetta-hieroes1.png', json: '' },
          { src: 'rosetta/rosetta-hieroes2.png', json: '' },
        ];
      }
      return response;
    },
  });
};

export const useUpdateImagesMutation = () => {
  const { client } = useClientContext();

  return useMutation({
    mutationFn: ({ id, images }: { id: string; images?: ClippedImageDto[] }) =>
      client.path('/api/rosetta/{id}/block').method('put').create()({
        id,
        images,
      }),
  });
};
