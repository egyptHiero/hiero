import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';
import { DictionaryItemDto } from '../../types/types';
import { DictionaryItemVO } from './types';

export const useGetDictionary = (
  dictionaryName: string | undefined,
  mapper: (item: DictionaryItemDto) => DictionaryItemVO,
) => {
  const { client } = useClientContext();

  return useInfinityScroll({
    enabled: !!dictionaryName,
    queryKey: ['dictionary', dictionaryName || ''],
    queryFn: ({ pageParam = '' }) =>
      client.GET('/api/dictionary/{id}', {
        params: {
          path: { id: dictionaryName ?? '' },
          query: { from: pageParam },
        },
      }),
    mapper,
  });
};
