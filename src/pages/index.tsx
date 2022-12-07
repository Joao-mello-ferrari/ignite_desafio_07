import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface AxiosResponse {
  after: string | null;
  data: {
    title: string;
    description: string;
    url: string;
    ts: number;
    id: string;
  }[];
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = undefined }) => {
      const url = '/api/images';
      const response = await api.get<AxiosResponse>(url, {
        params: { after: pageParam },
      });
      return response.data;
    },
    {
      getNextPageParam: response => response.after || undefined,
    }
  );

  const formattedData = useMemo(() => {
    if (!data) return [];

    const flattenedList = [];
    data.pages.forEach(page => {
      flattenedList.push(...page.data);
    });

    return flattenedList;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            mt={8}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
