import * as T from 'types';
import {
    SimpleGrid,
    Heading,
    Text,
    HStack,
    Tag,
    TagLabel,
} from '@chakra-ui/react';
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
            height="100%"
        >
            <Link to={`/book/${book.id}`}>
                <Heading>{book.title}</Heading>
            </Link>
            <Text align="right">{`by ${book.author.name}`}</Text>
            <CoverImage
                margin="0 auto"
                width="50%"
                imagePath={book.cover_url || null}
            />

            <HStack justifyContent="flex-end">
                <Link to={`/book/${book.id}/edit`}>
                    <EditIcon boxSize="1.5em" color="teal.500" />
                </Link>
            </HStack>
            <HStack>
                {book.tags &&
                    book.tags.map((tag) => (
                        <Tag mb={1} colorScheme="teal" key={tag.id}>
                            <TagLabel>{tag.name}</TagLabel>
                        </Tag>
                    ))}
            </HStack>
        </SimpleGrid>
    );
};

export default BookCard;
