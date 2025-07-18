import { useClientContext } from '../../app/context/client-context';
import { useInfinityScroll } from '../../components/infinite-table/hook';
import { DictionaryInfoDto } from '../../types/types';
import { useAppContext } from '../../app/context/app-context';

export const useGetDictionaryList = () => {
  const { client } = useClientContext();
  const { query } = useAppContext();

  return useInfinityScroll<DictionaryInfoDto>({
    queryKey: ['dictionaries', query ?? ''],
    queryFn: () =>
      client.GET('/api/dictionary', {
        params: {
          query: { query },
        },
      }),
  });
};
