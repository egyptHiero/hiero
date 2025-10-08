import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';
import { RosettaPartDto } from '../../types';
import { useSearchParams } from 'react-router-dom';

export const useGetRosettaPartsList = () => {
  const { client } = useClientContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || undefined;
  const blankOnly = searchParams.get('blankOnly') === 'true' || undefined;

  return useInfinityScroll<RosettaPartDto>({
    queryKey: ['rosetta-parts', query ?? '', blankOnly?.toString() ?? ''],
    queryFn: ({ pageParam = '' }) =>
      client.path('/api/rosetta/part').method('get').create()({
        from: pageParam,
        query,
        blankOnly,
      }),
  });
};
