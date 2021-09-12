import { useState } from 'react';
import { Button, Text, Heading, Box, SimpleGrid } from '@chakra-ui/react';
import RequestForm from './RequestForm';
import { SignInForm } from './SignInForm';
import { ResetPassword } from './ResetPassword';

const SignIn = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [showResetting, setShowResetting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (signedIn) {
        return (
            <Text>
                You'll get an email with a magic link that logs you in (look Ma,
                no passwords!)
            </Text>
        );
    }
    if (error) {
        return (
            <Box width="75%" minWidth="300px" margin="0 auto">
                <Text>{error}</Text>
                <Button
                    colorScheme="teal"
                    type="submit"
                    marginTop="5px"
                    onClick={() => {
                        setError(null);
                        setSignedIn(false);
                    }}
                >
                    Try Again
                </Button>
            </Box>
        );
    }

    if (showResetting) {
        return (
            <Box width="75%" miWidth="300px" margin="0 auto">
                <ResetPassword
                    onDone={() => setShowResetting(false)}
                    setError={setError}
                />
            </Box>
        );
    }

    return (
        <SimpleGrid
            width="75%"
            minWidth="300px"
            margin="0 auto"
            rows={2}
            column={1}
            spacingY="3"
        >
            <SignInForm
                setError={setError}
                setSignedIn={setSignedIn}
                setShowResetting={setShowResetting}
            />
            <Heading textAlign="center">Or request to join here:</Heading>
            <RequestForm />
        </SimpleGrid>
    );
};

export default SignIn;
