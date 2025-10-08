import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';
import { DictionaryInfoDto } from '../../types';
import { useSearchParams } from 'react-router-dom';

export const useGetDictionaryList = () => {
  const { client } = useClientContext();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || undefined;

  return useInfinityScroll<DictionaryInfoDto>({
    queryKey: ['dictionaries', query ?? ''],
    queryFn: () =>
      client.path('/api/dictionary').method('get').create()({ query }),
  });
};
