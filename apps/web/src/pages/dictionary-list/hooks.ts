import { useQuery } from '@tanstack/react-query';
import { useClientContext } from '../../app/client-context';

export const useGetDictionaryList = () => {
  const { client } = useClientContext();

  return useQuery({
    queryKey: ['dictionaries'],
    queryFn: () =>
      client.GET('/api/dictionary', {
//        params: { query: { type: 'dictionary' } },
      }),
    select: (response) => response.data?.items || [],
  });
};
