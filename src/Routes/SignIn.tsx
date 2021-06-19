import { SimpleGrid } from '@chakra-ui/react';
import SignIn from 'components/Auth/SignIn';
import Banner from 'components/Shared/Banner';

const SignInRoute = () => {
    return (
        <SimpleGrid rows={2} columns={1} spacingY="20px" m="5%">
            <Banner />
            <SignIn />
        </SimpleGrid>
    );
};

export default SignInRoute;
