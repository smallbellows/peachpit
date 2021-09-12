import { SimpleGrid, Box } from '@chakra-ui/react';
import BookCard from 'components/Books/BookCard';
import * as T from 'types';

type BookListProps = {
    books: T.Book[] | null | undefined;
};
const BookList = ({ books }: BookListProps) => {
    if (!books) return <div></div>;
    return (
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="5">
            {books.map((book) => {
                return (
                    <Box key={book.id}>
                        <BookCard key={book.id} book={book} />
                    </Box>
                );
            })}
        </SimpleGrid>
    );
};

export default BookList;
