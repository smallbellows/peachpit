import { useBooks } from 'context/Books';

const BookList = () => {
    const { books } = useBooks();

    return (
        <ol>
            {books.map((book) => {
                return <li key={book.id}>{book.title}</li>;
            })}
        </ol>
    );
};

export default BookList;
