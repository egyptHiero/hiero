import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';

export const useGetSignList = () => {
  const { client } = useClientContext();

  return useInfinityScroll({
    queryKey: ['signs'],
    queryFn: () => client.GET('/api/sign'),
  });
};
