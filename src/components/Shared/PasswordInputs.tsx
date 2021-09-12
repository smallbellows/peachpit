import { useEffect, useState } from 'react';
import {
    VStack,
    Input,
    FormLabel,
    InputGroup,
    InputRightAddon,
    Button,
    Text,
} from '@chakra-ui/react';

type PasswordInputsProps = {
    setPassword: (password: string) => void;
    setHasError: (hasError: boolean) => void;
};
const PasswordInputs = ({
    setPassword: setPasswordParent,
    setHasError,
}: PasswordInputsProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (password.length < 8) {
            setError('Password must be 8 characers or more');
            return;
        }
        if (password !== confirmPassword) {
            setError(`Passwords don't match!`);
            return;
        }
        setError(null);
        setPasswordParent(password);
    }, [password, confirmPassword, setError, setPasswordParent]);

    useEffect(() => {
        setHasError(Boolean(error));
    }, [error, setHasError]);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <VStack spacing="3">
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
        </VStack>
    );
};

export default PasswordInputs;
