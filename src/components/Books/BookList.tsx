import { useBooks } from 'context/Books';
import { SimpleGrid, Box } from '@chakra-ui/react';
import BookCard from 'components/Books/BookCard';
const BookList = () => {
    const { books } = useBooks();

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
