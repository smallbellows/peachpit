import * as T from 'types';
import { useState, useEffect } from 'react';
import { useLoading } from 'context/Loading';
import { Wrap, SimpleGrid, Text, Button, Image } from '@chakra-ui/react';
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

const cleanImageUrl = (rawUrl: string): string => {
    const [url, params] = rawUrl.split('?');
    const onlyRequiredParams = params
        .split('&')
        .filter((param) => {
            const [key] = param.split('=');
            return !['source', 'edge'].includes(key);
        })
        .join('&');
    const secureUrl = url.replace('http', 'https');
    return `${secureUrl}?${onlyRequiredParams}`;
};

const GoogleBooksSearchResults = (props: GBSRProps) => {
    const { title, author } = props.book;
    const { isLoading, setIsLoading } = useLoading();
    const [books, setBooks] = useState<SearchResultItem[]>([]);
    const searchTitle = encodeURIComponent(title);
    const searchAuthor = author.name ? encodeURIComponent(author.name) : null;
    useEffect(() => {
        const queryBooks = async () => {
            setIsLoading(true);
            const titleQuery = `intitle:${searchTitle}`;
            const authorQuery = searchAuthor ? `+inauthor:${searchAuthor}` : '';
            const searchResults = await fetch(
                `${queryURL}&q=${titleQuery}+${authorQuery}`
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
                        author: authors?.length ? authors[0] : '',
                        imageLink: imageLinks
                            ? cleanImageUrl(imageLinks.thumbnail)
                            : '',
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
            {books.map((book, index) => (
                <SimpleGrid
                    key={`${book.id}+${index}`}
                    border="1px solid"
                    borderColor="red.800"
                    p="2"
                    borderRadius="3"
                    row={3}
                    column={1}
                    spacingY="3"
                >
                    <Text as="i">
                        {book.title} by {book.author}
                    </Text>
                    <Text>
                        {book.imageLink && (
                            <Image
                                src={book.imageLink}
                                alt="cover image"
                                float="left"
                                p="5px"
                            />
                        )}

                        {book.description}
                    </Text>
                    <Button
                        size="xs"
                        onClick={() => props.onSelected(book)}
                        justifySelf="end"
                        width="fit-content"
                    >
                        This one
                    </Button>
                </SimpleGrid>
            ))}
        </Wrap>
    );
};

export default GoogleBooksSearchResults;
