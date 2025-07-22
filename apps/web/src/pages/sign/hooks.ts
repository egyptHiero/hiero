import { useMutation, useQuery } from '@tanstack/react-query';
import { useClientContext } from '../../app/context/client-context';
import { SignDto } from '../../types/types';

export const useGetSign = (id: string | undefined) => {
  const { client } = useClientContext();

  return useQuery({
    enabled: !!id && id !== 'new',
    queryKey: ['sign', id],
    queryFn: () =>
      id
        ? client.path('/api/sign/{id}').method('get').create()({ id })
        : undefined,
  });
};

export const useSaveMutation = () => {
  const { client } = useClientContext();

  return useMutation({
    mutationFn: (values: SignDto) =>
      values.id
        ? client.path('/api/sign/{id}').method('put').create()({
            ...values,
          })
        : client.path('/api/sign').method('post').create()({
            ...values,
          }),
    meta: {
      invalidates: [['sign']],
    },
  });
};

export const useDeleteMutation = () => {
  const { client } = useClientContext();

  return useMutation({
    mutationFn: (id: string) =>
      client.path('/api/sign/{id}').method('delete').create()({
        id,
      }),
    meta: {
      invalidates: [['sign']],
    },
  });
};
