import * as T from 'types';
import { useState, useEffect } from 'react';
import { useLoading } from 'context/Loading';
import { Wrap, Box, Text, Button, Image } from '@chakra-ui/react';
const queryURL = `https://www.googleapis.com/books/v1/volumes?
    key=${process.env.REACT_APP_GOOGLE_API_KEY}
    &projection=lite`;

interface GBSRProps {
    book: T.Book;
    onSelected: (book: SearchResultItem) => void;
}

interface SearchResultItem {
    id: string;
    title: string;
    author: string;
    description?: string;
    imageLink: string;
}

const GoogleBooksSearchResults = (props: GBSRProps) => {
    const { title, author } = props.book;
    const { isLoading, setIsLoading } = useLoading();
    const [books, setBooks] = useState<SearchResultItem[]>([]);
    const searchTitle = encodeURIComponent(title);
    const searchAuthor = encodeURIComponent(author.name);
    useEffect(() => {
        const queryBooks = async () => {
            setIsLoading(true);
            const searchResults = await fetch(
                `${queryURL}&q=intitle:${searchTitle}+inauthor:${searchAuthor}`
            )
                .then((r) => {
                    if (r.status === 200) {
                        return r.json();
                    } else throw Error(`${r.status}: ${r.statusText}`);
                })
                .catch((e) => {
                    console.log('unable to search for books', e);
                })
                .finally(() => {
                    setIsLoading(false);
                });
            if (searchResults && Array.isArray(searchResults.items)) {
                const shapedBooks = searchResults.items.map((i: any) => {
                    const { id, volumeInfo } = i;
                    const { title, authors, imageLinks, description } =
                        volumeInfo;
                    const book: SearchResultItem = {
                        id,
                        title,
                        author: authors.length ? authors[0] : '',
                        imageLink: imageLinks ? imageLinks.thumbnail : '',
                        description: description ? description : '',
                    };
                    return book;
                });
                setBooks(shapedBooks);
            } else {
                setBooks([]);
            }
        };
        queryBooks();
    }, [searchTitle, searchAuthor, setIsLoading]);

    if (!isLoading && !books.length) {
        return <div>No books found...</div>;
    }
    return (
        <Wrap>
            {books.map((book) => (
                <Box
                    key={book.id}
                    border="1px solid"
                    borderColor="red.800"
                    p="2"
                    borderRadius="3"
                >
                    <Text mb="1" as="i">
                        {book.title} by {book.author}
                    </Text>
                    <Text>
                        {' '}
                        <Image
                            src={book.imageLink}
                            alt="cover image"
                            float="left"
                            p="5px"
                        />
                        {book.description}
                    </Text>
                    <Button size="xs" onClick={() => props.onSelected(book)}>
                        This one
                    </Button>
                </Box>
            ))}
        </Wrap>
    );
};

export default GoogleBooksSearchResults;
