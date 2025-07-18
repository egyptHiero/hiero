import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';
import { useAppContext } from '../../app/context/app-context';

export const useGetSignList = () => {
  const { client } = useClientContext();
  const { query } = useAppContext();

  return useInfinityScroll({
    queryKey: ['signs', query ?? ''],
    queryFn: () =>
      client.GET('/api/sign', {
        params: {
          query: { query },
        },
      }),
  });
};
