import { createContext, useContext, useState, useEffect } from 'react';
import { getAllBooks } from 'utils';
import * as T from 'types';

const BooksContext = createContext<T.BooksContext | null>(null);

const BooksProvider = ({ children, booksProp }: any) => {
    const [books, setBooks] = useState<T.Book[]>(booksProp || []);

    const getBooksData = async () => {
        const books = await getAllBooks();
        setBooks(books);
    };

    useEffect(() => {
        getBooksData();
    }, []);
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

    return (
        <BooksContext.Provider value={{ books, addBook, editBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    );
};

const useBooks = () => useContext(BooksContext) as T.BooksContext;
export { BooksProvider, useBooks };
