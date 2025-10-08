import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../controls/infinite-table/hook';
import { useSearchParams } from 'react-router-dom';

export const useGetSignList = () => {
  const { client } = useClientContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || undefined;

  return useInfinityScroll({
    queryKey: ['signs', query ?? ''],
    queryFn: () => client.path('/api/sign').method('get').create()({ query }),
  });
};
