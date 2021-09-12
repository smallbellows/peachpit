import { Redirect } from 'react-router-dom';
import BookList from 'components/Books/BookList';
import { useUser } from 'context/Auth';
import { useBooks } from 'context/Books';
import MainLayout from 'components/Layout/Main';

const Home = (): JSX.Element | null => {
    const user = useUser();
    const { books } = useBooks();
    if (!user || !user.userId) return null;
    if (user && !user.username) {
        return <Redirect to="/profile" />;
    }

    return (
        <MainLayout>
            <BookList books={books} />
        </MainLayout>
    );
};

export default Home;
