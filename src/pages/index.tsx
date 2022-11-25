import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

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
      const url = `/api/images?after=${pageParam}`;
      const response = await api.get(url);
      return response.data;
    },
    {
      getNextPageParam: response => response.after || undefined,
      staleTime: Infinity,
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
        {/* <CardList cards={formattedData} /> */}
        {formattedData.map(a => (
          <div key={a.id}>a.title</div>
        ))}
        {hasNextPage && (
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            loadingText="Carregando"
            _loading={{
              flexDirection: 'row-reverse',
              fontSize: '16',
              gap: '2',
            }}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
