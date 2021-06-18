import { Center, Spinner } from '@chakra-ui/react';

const FullSpinner = (): JSX.Element => {
    return (
        <Center w="100vw" h="100vw" bg="white" opacity="75%" zIndex="10000000">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Center>
    );
};

export default FullSpinner;
