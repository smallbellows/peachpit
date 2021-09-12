import { createContext, useContext, useState, useEffect } from 'react';
import { getAllBooks, getAllTags } from 'utils';
import * as T from 'types';
import { useUser } from 'context/Auth';
const BooksContext = createContext<T.BooksContext | null>(null);
const TagsContext = createContext<T.TagsContext | null>(null);

const BooksProvider = ({ children }: any) => {
    const [books, setBooks] = useState<T.Book[]>([]);
    const [tags, setTags] = useState<T.Tag[]>([]);
    const user = useUser();
    const getBooksData = async () => {
        const books = await getAllBooks();
        setBooks(books);
    };

    const getTagsData = async () => {
        const tags = await getAllTags();
        setTags(tags);
    };

    useEffect(() => {
        getBooksData();
        getTagsData();
    }, [user]);

    const addBook = (book: T.Book) => {
        setBooks([...books, book]);
    };

    const editBook = (book: T.Book) => {
        const newBooks = books.map((oldBook) => {
            if (book.id === oldBook.id) {
                return book;
            }
            return { ...oldBook };
        });
        setBooks(newBooks);
    };

    const deleteBook = (id: number) => {
        setBooks(books.filter((book) => book.id === id));
    };

    const addTag = (tag: T.Tag) => {
        setTags([...tags, tag]);
    };

    return (
        <TagsContext.Provider value={{ tags, addTag }}>
            <BooksContext.Provider
                value={{ books, addBook, editBook, deleteBook }}
            >
                {children}
            </BooksContext.Provider>
        </TagsContext.Provider>
    );
};

const useBooks = () => useContext(BooksContext) as T.BooksContext;
const useTags = () => useContext(TagsContext) as T.TagsContext;
export { BooksProvider, useBooks, useTags };
