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
        ? client.GET('/api/sign/{id}', {
            params: {
              path: {
                id,
              },
            },
          })
        : undefined,
  });
};

export const useSaveMutation = () => {
  const { client } = useClientContext();

  return useMutation({
    mutationFn: (values: SignDto) =>
      values.id
        ? client.PUT('/api/sign/{id}', {
            params: {
              path: { id: values.id },
            },
            body: values,
          })
        : client.POST('/api/sign', { body: values }),
    mutationKey: ['update', 'sign'],
  });
};

export const useDeleteMutation = () => {
  const { client } = useClientContext();

  return useMutation({
    mutationFn: (id: string) =>
      client.DELETE('/api/sign/{id}', {
        params: {
          path: { id },
        },
      }),
    mutationKey: ['delete', 'sign'],
  });
};
