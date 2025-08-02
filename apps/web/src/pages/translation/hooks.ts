import { useMutation, useQuery } from '@tanstack/react-query';
import { useClientContext } from '../../app/context/client-context';
import { TranslationDto } from '../../types/types';

export const useGetTranslation = (id: string | undefined) => {
  const { client } = useClientContext();

  return useQuery({
    enabled: !!id && id !== 'new',
    queryKey: ['translation', id],
    queryFn: () =>
      id
        ? client.path('/api/translation/{id}').method('get').create()({ id })
        : undefined,
  });
};

export const useSaveMutation = () => {
  const { client } = useClientContext();

  return useMutation({
    mutationFn: (values: TranslationDto) =>
      values.id
        ? client.path('/api/translation/{id}').method('put').create()({
            ...values,
          })
        : client.path('/api/translation').method('post').create()({
            ...values,
          }),
    meta: {
      invalidates: [['translation']],
    },
  });
};

export const useDeleteMutation = () => {
  const { client } = useClientContext();

  return useMutation({
    mutationFn: (id: string) =>
      client.path('/api/translation/{id}').method('delete').create()({
        id,
      }),
    meta: {
      invalidates: [['translation']],
    },
  });
};
