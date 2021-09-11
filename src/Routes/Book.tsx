import { useParams } from 'react-router-dom';
import MainLayout from 'components/Layout/Main';
import BookPage from 'components/Books/BookPage';

const Book = () => {
    const { id } = useParams();
    return (
        <MainLayout>
            <BookPage id={+id} />
        </MainLayout>
    );
};

export default Book;
