import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';
import { DictionaryInfoDto } from '../../types/types';

export const useGetDictionaryList = () => {
  const { client } = useClientContext();

  return useInfinityScroll<DictionaryInfoDto>({
    queryKey: ['dictionaries'],
    queryFn: () => client.GET('/api/dictionary'),
  });
};
