import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';
import { DictionaryItemDto } from '../../types/types';
import { DictionaryItemVO } from './types';
import { useAppContext } from '../../app/context/app-context';

export const useGetDictionary = (
  dictionaryName: string | undefined,
  mapper: (item: DictionaryItemDto) => DictionaryItemVO,
) => {
  const { client } = useClientContext();
  const { query } = useAppContext();

  return useInfinityScroll({
    enabled: !!dictionaryName,
    queryKey: ['dictionary', dictionaryName ?? '', query ?? ''],
    queryFn: ({ pageParam = '' }) =>
      client.path('/api/dictionary/{id}').method('get').create()({
        id: dictionaryName ?? '',
        from: pageParam,
        query,
      }),
    mapper,
  });
};
