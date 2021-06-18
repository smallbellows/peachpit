import { SimpleGrid } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import Header from 'components/Header';
import Banner from 'components/Banner';
import BookList from 'components/BookList';
import { useUser } from 'context/Auth';

const Home = (): JSX.Element | null => {
    const user = useUser();

    if (!user || !user.userId) return null;
    if (user && !user.username) {
        return <Redirect to="/profile" />;
    }
    return (
        <SimpleGrid rows={3} columns={1} spacingY="20px" m="5%">
            <Header />
            <Banner />
            <BookList />
        </SimpleGrid>
    );
};

export default Home;
