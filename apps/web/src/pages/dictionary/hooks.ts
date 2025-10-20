import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../controls/infinite-table/hook';
import { DictionaryItemDto } from '../../types';
import { DictionaryItemVO } from './types';
import { useSearchParams } from 'react-router-dom';

export const useGetDictionary = (
  dictionaryName: string | undefined,
  mapper: (item: DictionaryItemDto) => DictionaryItemVO,
) => {
  const { client } = useClientContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || undefined;

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
