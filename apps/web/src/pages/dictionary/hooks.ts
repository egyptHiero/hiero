import {useQuery} from '@tanstack/react-query';
import {useClientContext} from "../../app/context/client-context";

export const useGetDictionary = (id?: string) => {
  const {client} = useClientContext();

  return useQuery({
    queryKey: ['dictionary', id],
    enabled: !!id,
    queryFn: () =>
      id ? client.GET('/api/dictionary/{id}', {
        params: {path: {id}},
      }) : undefined,
    select: (response) => response?.data?.items || [],
  });
};
