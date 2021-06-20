import { useParams } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/layout';
import Header from 'components/Shared/Header';
import Banner from 'components/Shared/Banner';
import BookPage from 'components/Books/BookPage';

const Book = () => {
    const { id } = useParams();
    return (
        <SimpleGrid rows={3} columns={1} spacingY="20px" m="5%">
            <Header />
            <Banner />
            <BookPage id={id} />
        </SimpleGrid>
    );
};

export default Book;
