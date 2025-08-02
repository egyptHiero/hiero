import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';
import { useAppContext } from '../../app/context/app-context';

export const useGetTranslationList = () => {
  const { client } = useClientContext();
  const { query } = useAppContext();

  return useInfinityScroll({
    queryKey: ['translations', query ?? ''],
    queryFn: () =>
      client.path('/api/translation').method('get').create()({ query }),
  });
};
