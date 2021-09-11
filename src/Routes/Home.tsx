import { Redirect } from 'react-router-dom';
import BookList from 'components/Books/BookList';
import { useUser } from 'context/Auth';
import MainLayout from 'components/Layout/Main';
const Home = (): JSX.Element | null => {
    const user = useUser();

    if (!user || !user.userId) return null;
    if (user && !user.username) {
        return <Redirect to="/profile" />;
    }

    return (
        <MainLayout>
            <BookList />
        </MainLayout>
    );
};

export default Home;
