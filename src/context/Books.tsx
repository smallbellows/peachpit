import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from 'utils';
import * as T from 'types';

const BooksContext = createContext<T.BooksContext | null>(null);

const BooksProvider = ({ children, booksProp }: any) => {
    const [books, setBooks] = useState<T.Book[]>(booksProp || []);

    const getBooksData = async () => {
        const { data, error } = await supabase.from('books').select(`
            id,
            title,
            author: author (
                name,
                id
            )
        `);
        if (data) {
            setBooks(data);
        }
        if (error) {
            console.log(error);
            setBooks([]);
        }
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
