import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  const { onOpen, onClose, isOpen } = useDisclosure();

  function handleViewImage(url: string): void {
    setSelectedImgUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid gap={16} minChildWidth={240}>
        {cards.map(card => (
          <div key={card.id}>
            <Card data={card} viewImage={url => handleViewImage(url)} />
          </div>
        ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={selectedImgUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
