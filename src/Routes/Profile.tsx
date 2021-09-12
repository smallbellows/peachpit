import { SimpleGrid } from '@chakra-ui/react';
import Banner from 'components/Shared/Banner';
import ProfileForm from 'components/Profile/ProfileForm';

type ProfileProps = {
    view: 'new' | 'edit';
};
const Profile = ({ view }: ProfileProps): JSX.Element => {
    return (
        <SimpleGrid rows={2} columns={1} spacingY="20px" m="5%">
            <Banner />
            <ProfileForm view={view} />
        </SimpleGrid>
    );
};

export default Profile;
