import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as T from 'types';
import { getBook, updateBook } from 'utils';
import { useLoading } from 'context/Loading';
import { useUser } from 'context/Auth';
import { Container } from '@chakra-ui/react';
import BookForm from 'components/Books/BookForm';
import TagPicker from 'components/Shared/TagPicker';
import { useBooks, useTags } from 'context/Books';
import { insertTag } from 'utils';
interface EditBookProps {
    id: number;
}
const EditBook = ({ id }: EditBookProps) => {
    const { isLoading, setIsLoading } = useLoading();
    const history = useHistory();
    const [book, setBook] = useState<T.Book | null>(null);
    const user = useUser();
    const { editBook } = useBooks();
    const { tags, addTag } = useTags();
    const load = useCallback(async () => {
        setIsLoading(true);
        const result = await getBook(id);
        setBook(result);
        setIsLoading(false);
    }, [id, setIsLoading]);

    useEffect(() => {
        load();
    }, [load]);

    const onCreateTag = async (tagName: string) => {
        if (!user) return null;
        const tag = await insertTag(tagName, user);
        if (tag) {
            addTag(tag);
            if (book) {
                const tags = book.tags || [];
                setBook({ ...book, tags: [...tags, tag] });
            }
        }
        return tag;
    };

    if (!user) return <div />;

    if (!isLoading && !book) {
        return <div>Invalid book id...</div>;
    }

    if (book) {
        return (
            <Container sx={{ 'input, textarea': { background: 'gray.50' } }}>
                <BookForm
                    book={book}
                    onSubmit={async (updatedBook: T.Book) => {
                        const isAuthorChanged =
                            updatedBook.author.name !== book.author.name;
                        const newBook = await updateBook(
                            updatedBook,
                            isAuthorChanged,
                            user
                        );
                        editBook({ ...newBook, tags: book.tags });
                        history.push(`/book/${newBook.id}`);
                    }}
                    onCancel={() => history.goBack()}
                />
                {book && (
                    <TagPicker
                        tags={book.tags || []}
                        allTags={tags}
                        onCreateTag={onCreateTag}
                        onSelection={(tags: T.Tag[]) => {
                            setBook({ ...book, tags });
                        }}
                    />
                )}
            </Container>
        );
    }
    return <div />;
};

export default EditBook;
