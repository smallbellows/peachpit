import {
    Box,
    Button,
    ButtonGroup,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from 'context/Auth';

type ResetPasswordProps = {
    setError: (error: string) => void;
    onDone: () => void;
};
export const ResetPassword = ({ setError, onDone }: ResetPasswordProps) => {
    const [email, setEmail] = useState('');
    const auth = useAuth();

    const handleReset = async () => {
        if (email && email.length) {
            await auth
                ?.resetPassword(email)
                .catch((e: Error) => setError(e.message));
            onDone();
        }
    };

    return (
        <Box>
            <FormLabel htmlFor="email">
                <Input
                    type="email"
                    id="email"
                    background="gray.50"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </FormLabel>
            <ButtonGroup>
                <Button color="teal" variant="outline" onClick={onDone}>
                    Cancel
                </Button>
                <Button colorScheme="teal" onClick={handleReset}>
                    Reset Password
                </Button>
            </ButtonGroup>

            <Text>
                You will get an email with instructions on how to reset your
                password shortly.
            </Text>
        </Box>
    );
};
