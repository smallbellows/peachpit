import { useBooks } from 'context/Books';
import { Wrap, WrapItem } from '@chakra-ui/react';
import BookCard from 'components/Books/BookCard';
const BookList = () => {
    const { books } = useBooks();

    return (
        <Wrap spacing="2">
            {books.map((book) => {
                return (
                    <WrapItem key={book.id}>
                        <BookCard key={book.id} book={book} />
                    </WrapItem>
                );
            })}
        </Wrap>
    );
};

export default BookList;
