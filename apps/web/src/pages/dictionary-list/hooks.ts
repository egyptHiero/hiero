import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';

export const useGetDictionaryList = () => {
  const { client } = useClientContext();

  return useInfinityScroll({
    queryKey: ['dictionaries'],
    queryFn: () => client.GET('/api/dictionary'),
  });
};
