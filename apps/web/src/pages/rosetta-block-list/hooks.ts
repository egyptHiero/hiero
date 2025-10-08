import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';
import { RosettaBlocksDto } from '../../types';
import { useSearchParams } from 'react-router-dom';

export const useGetRosettaBlocksList = () => {
  const { client } = useClientContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || undefined;

  return useInfinityScroll<RosettaBlocksDto>({
    queryKey: ['rosetta-blocks', query ?? ''],
    queryFn: ({ pageParam = '' }) =>
      client.path('/api/rosetta/block').method('get').create()({
        from: pageParam,
        query,
      }),
  });
};
