import * as T from 'types';
import { SimpleGrid, Heading, Text, Image, HStack } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import placeholderCover from './book-cover-placeholder.svg';

interface BookCardProps {
    book: T.Book;
}
const BookCard = (props: BookCardProps) => {
    const { book } = props;
    return (
        <SimpleGrid
            column={1}
            spacingY="1"
            border="2px solid"
            borderColor="teal.800"
            borderRadius="md"
            p="2"
        >
            <Heading>{book.title}</Heading>
            <Text align="right">{`by ${book.author.name}`}</Text>
            <Image
                margin="0 auto"
                width="50%"
                src={placeholderCover}
                alt="placeholder book cover"
            />
            <HStack justifyContent="flex-end">
                <EditIcon boxSize="1.5em" color="teal.500" />
            </HStack>
        </SimpleGrid>
    );
};

export default BookCard;
