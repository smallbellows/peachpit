import * as T from 'types';
import { useLoading } from 'context/Loading';
import { useEffect, useState, useCallback } from 'react';
import { getBook, updateBook } from 'utils';
import {
    Container,
    Heading,
    Text,
    Box,
    ButtonGroup,
    Button,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
} from '@chakra-ui/react';
import CoverImage from 'components/Books/CoverImage';
import GoogleBooksSearchResults from 'components/Books/GoogleBooksSearchResults';
import { useUser } from 'context/Auth';
import { useHistory } from 'react-router-dom';
interface BookPageProps {
    id: number;
}

const BookPage = (props: BookPageProps) => {
    const { isLoading, setIsLoading } = useLoading();
    const [book, setBook] = useState<T.Book | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const load = useCallback(async () => {
        setIsLoading(true);
        const result = await getBook(props.id);
        setBook(result);
        setIsLoading(false);
    }, [props.id, setIsLoading]);

    useEffect(() => {
        load();
    }, [load]);

    const user = useUser();
    const handleUpdate = async (
        updatedBook: T.Book,
        isAuthorUpdated: boolean
    ) => {
        if (!user) return;
        setIsLoading(true);
        const newBook = await updateBook(updatedBook, isAuthorUpdated, user);

        setIsLoading(false);
        onClose();
        setBook(newBook);
    };

    if (!isLoading && !book) {
        return <div>No book found...</div>;
    }
    if (book) {
        return (
            <>
                <Container>
                    <Heading>{book.title}</Heading>
                    <Text>{`by ${book.author.name}`}</Text>
                    <Box>
                        <Box w="25%" float="left">
                            <CoverImage
                                w="95%"
                                float="left"
                                imagePath={book.cover_url || null}
                            />
                        </Box>

                        <Text m="2">{book.description}</Text>
                    </Box>
                    <ButtonGroup>
                        <Button onClick={onOpen}>Fill google book info</Button>
                        <Button
                            onClick={() =>
                                history.push(`/book/${book.id}/edit`)
                            }
                        >
                            Edit
                        </Button>
                    </ButtonGroup>
                </Container>
                <Drawer onClose={onClose} isOpen={isOpen} size="md">
                    <DrawerOverlay />
                    <DrawerContent overflow="auto">
                        <DrawerHeader>
                            <Heading>Search Results</Heading>
                        </DrawerHeader>
                        <DrawerBody>
                            <GoogleBooksSearchResults
                                book={book}
                                onSelected={(bookFromSearch) => {
                                    const bookToUpdate: T.Book = {
                                        id: book.id,
                                        author: {
                                            id: book.author.id,
                                            name: bookFromSearch.author,
                                        },
                                        title: bookFromSearch.title,
                                        description: bookFromSearch.description,
                                        cover_url: bookFromSearch.imageLink,
                                        created_at: book.created_at,
                                        created_by: book.created_by,
                                    };
                                    const isAuthorUpdated =
                                        book.author.name !==
                                        bookToUpdate.author.name;
                                    handleUpdate(bookToUpdate, isAuthorUpdated);
                                }}
                            />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }
    return <div />;
};

export default BookPage;
