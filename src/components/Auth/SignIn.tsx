import { useState } from 'react';
import { useAuth } from 'context/Auth';
import { Formik, Form, Field, FieldProps } from 'formik';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Heading,
    Box,
} from '@chakra-ui/react';

const SignIn = () => {
    const auth = useAuth();
    const [signedIn, setSignedIn] = useState(false);
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
    return (
        <Box width="75%" minWidth="300px" margin="0 auto">
            <Formik
                initialValues={{ email: '' }}
                onSubmit={async (values) => {
                    if (values && values.email) {
                        const result = await auth?.login(values);
                        if (result.error) {
                            setError(result.error.message);
                        } else {
                            setSignedIn(true);
                        }
                    }
                }}
            >
                {() => {
                    return (
                        <Form>
                            <Field name="email">
                                {({ field, form }: FieldProps) => {
                                    return (
                                        <FormControl
                                            isInvalid={Boolean(
                                                form.errors.email &&
                                                    form.touched.email
                                            )}
                                        >
                                            <FormLabel htmlFor="email">
                                                Email
                                            </FormLabel>
                                            <Input
                                                type="email"
                                                id="email"
                                                required
                                                background="gray.50"
                                                {...field}
                                            />
                                        </FormControl>
                                    );
                                }}
                            </Field>
                            <Box textAlign="right">
                                <Button
                                    colorScheme="teal"
                                    type="submit"
                                    marginTop="5px"
                                >
                                    <Heading as="p" size="md">
                                        Sign In
                                    </Heading>
                                </Button>
                            </Box>
                        </Form>
                    );
                }}
            </Formik>
        </Box>
    );
};

export default SignIn;
