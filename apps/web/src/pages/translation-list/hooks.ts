import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../controls/infinite-table/hook';
import { useSearchParams } from 'react-router-dom';

export const useGetTranslationList = () => {
  const { client } = useClientContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || undefined;

  return useInfinityScroll({
    queryKey: ['translations', query ?? ''],
    queryFn: () =>
      client.path('/api/translation').method('get').create()({ query }),
  });
};
