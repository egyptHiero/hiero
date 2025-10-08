import { useMutation, useQuery } from '@tanstack/react-query';
import { useClientContext } from '../../app/context/client-context';

export const useGetRosettaBlock = (id: string | undefined) => {
  const { client } = useClientContext();

  return useQuery({
    queryKey: ['rosetta-item', id],
    queryFn: () =>
      id
        ? client.path('/api/rosetta/block/{id}').method('get').create()({ id })
        : undefined,
  });
};

export const useUpdateCodesMutation = () => {
  const { client } = useClientContext();

  return useMutation({
    mutationFn: ({ id, codes }: { id: string; codes?: string }) =>
      client.path('/api/rosetta/{id}/codes').method('put').create()({
        id,
        codes,
      }),
  });
};
