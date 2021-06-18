import { Flex } from '@chakra-ui/react';
import Banner from 'components/Banner';

const Home = (): JSX.Element => {
    return (
        <Flex background="grey.200" direction="column">
            <Banner />
        </Flex>
    );
};

export default Home;
