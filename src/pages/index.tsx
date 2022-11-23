import Image from 'next/image';
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
    async () => {
      const r = await api.get('http://localhost:3000/api/images');
      return r.data.data;
    }
    // TODO AXIOS REQUEST WITH PARAM
    // ,
    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  console.log(data, hasNextPage);

  // async function a(): Promise<void> {
  //   const r = await api.get('http://localhost:3000/api/images');
  //   console.log(r);
  // }

  // a();

  // const formattedData = useMemo(() => {
  //   return data;
  //   // TODO FORMAT AND FLAT DATA ARRAY
  // }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {/* <CardList cards={formattedData} /> */}
        <Image
          src="https://i.ibb.co/zW3fdZn/Eu-com-filtro-leve.jpg"
          alt="a1"
          width="100"
          height="100"
          // fill="fixed"
        />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
