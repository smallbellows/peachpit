import BookList from 'components/Books/BookList';
import { useParams } from 'react-router-dom';
import { useBooks } from 'context/Books';
import MainLayout from 'components/Layout/Main';
import { Text } from '@chakra-ui/react';
import * as T from 'types';
const Tag = () => {
    const { books } = useBooks();
    const { slug } = useParams();

    let matchingBooks: T.Book[] = [];
    if (slug && books) {
        matchingBooks = books.filter(
            (b) => b.tags && b.tags.filter((t) => t.slug === slug).length
        );
    }

    return (
        <MainLayout>
            {matchingBooks.length ? (
                <BookList books={matchingBooks} />
            ) : (
                <Text>No matching books</Text>
            )}
        </MainLayout>
    );
};

export default Tag;
