import * as T from 'types';
import { SimpleGrid, Heading, Text, HStack } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import CoverImage from 'components/Books/CoverImage';
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
            <Link to={`/book/${book.id}`}>
                <Heading>{book.title}</Heading>
            </Link>
            <Text align="right">{`by ${book.author.name}`}</Text>
            <CoverImage
                margin="0 auto"
                width="50%"
                imagePath={book.cover_url}
            />

            <HStack justifyContent="flex-end">
                <EditIcon boxSize="1.5em" color="teal.500" />
            </HStack>
        </SimpleGrid>
    );
};

export default BookCard;
