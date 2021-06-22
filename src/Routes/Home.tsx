import { Redirect } from 'react-router-dom';
import NewBookButton from 'components/Books/NewBookButton';
import BookList from 'components/Books/BookList';
import { useUser } from 'context/Auth';
import { BooksProvider } from 'context/Books';
import MainLayout from 'components/Layout/Main';
const Home = (): JSX.Element | null => {
    const user = useUser();

    if (!user || !user.userId) return null;
    if (user && !user.username) {
        return <Redirect to="/profile" />;
    }

    return (
        <MainLayout>
            <BooksProvider>
                <NewBookButton />
                <BookList />
            </BooksProvider>
        </MainLayout>
    );
};

export default Home;
