import { useParams } from 'react-router-dom';
import MainLayout from 'components/Layout/Main';
import EditBookPage from 'components/Books/EditBook';

const EditBook = () => {
    const { id } = useParams();
    return (
        <MainLayout>
            <EditBookPage id={id} />
        </MainLayout>
    );
};

export default EditBook;
