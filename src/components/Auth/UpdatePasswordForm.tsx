import {
    VStack,
    Input,
    FormLabel,
    InputGroup,
    InputRightAddon,
    Button,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

type UpdatePasswordFormProps = {
    updatePassword: (password: string) => void;
};
export const UpdatePasswordForm = ({
    updatePassword,
}: UpdatePasswordFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUpdatePassword = () => {
        if (password.length < 8) {
            setError('Password must be 8 characers or more');
            return;
        }
        if (password !== confirmPassword) {
            setError(`Passwords don't match!`);
            return;
        }
        updatePassword(password);
    };
    return (
        <VStack spacing="3" width="75%" minWidth="300px" margin="0 auto">
            <FormLabel htmlFor="password">New Password</FormLabel>
            <InputGroup>
                <Input
                    id="password"
                    background="gray.50"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightAddon>
                    <Button
                        size="sm"
                        onClick={handleTogglePassword}
                        colorScheme="gray"
                    >
                        {showPassword ? 'hide' : 'show'}
                    </Button>
                </InputRightAddon>
            </InputGroup>

            <FormLabel htmlFor="confirm">Confirm password</FormLabel>
            <InputGroup>
                <Input
                    id="confirm"
                    background="gray.50"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightAddon>
                    <Button
                        size="sm"
                        onClick={handleTogglePassword}
                        colorScheme="gray"
                    >
                        {showPassword ? 'hide' : 'show'}
                    </Button>
                </InputRightAddon>
            </InputGroup>
            <Text colorScheme="blackAlpha">{error}</Text>
            <Button onClick={handleUpdatePassword}>Confirm</Button>
        </VStack>
    );
};
