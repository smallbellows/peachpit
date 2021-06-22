import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as T from 'types';
import { getBook } from 'utils';
import { useLoading } from 'context/Loading';
import { useUser } from 'context/Auth';
import { Container } from '@chakra-ui/react';
import BookForm from 'components/Books/BookForm';
import { FormikHelpers } from 'formik';

interface EditBookProps {
    id: number;
}
const EditBook = ({ id }: EditBookProps) => {
    const { isLoading, setIsLoading } = useLoading();
    const history = useHistory();
    const [book, setBook] = useState<T.Book | null>(null);
    const user = useUser();

    const load = useCallback(async () => {
        setIsLoading(true);
        const result = await getBook(id);
        setBook(result);
        setIsLoading(false);
    }, [id, setIsLoading]);

    useEffect(() => {
        load();
    }, [load]);

    if (!user) return <div />;

    if (!isLoading && !book) {
        return <div>Invalid book id...</div>;
    }

    if (book) {
        return (
            <Container sx={{ 'input, textarea': { background: 'gray.50' } }}>
                <BookForm
                    book={book}
                    onSubmit={(book: T.Book, actions: FormikHelpers<any>) => {}}
                    onCancel={() => history.goBack()}
                />
            </Container>
        );
    }
    return <div />;
};

export default EditBook;
