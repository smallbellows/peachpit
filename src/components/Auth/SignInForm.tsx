import { Formik, Form, Field, FieldProps } from 'formik';
import {
    FormControl,
    FormLabel,
    Input,
    Flex,
    Button,
    Spacer,
    Heading,
} from '@chakra-ui/react';
import { useAuth } from 'context/Auth';

type SignInFormProps = {
    setError: (message: string) => void;
    setSignedIn: (isSignedIn: boolean) => void;
    setShowResetting: (isResetting: boolean) => void;
};

export const SignInForm = ({
    setError,
    setSignedIn,
    setShowResetting,
}: SignInFormProps) => {
    const auth = useAuth();
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
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
                        <Field name="password">
                            {({ field, form }: FieldProps) => {
                                return (
                                    <FormControl
                                        isInvalid={Boolean(
                                            form.errors.password &&
                                                form.touched.password
                                        )}
                                    >
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <Input
                                            type="password"
                                            id="password"
                                            required
                                            background="gray.50"
                                            {...field}
                                        />
                                    </FormControl>
                                );
                            }}
                        </Field>
                        <Flex>
                            <Button
                                colorScheme="gray"
                                variant="link"
                                onClick={() => setShowResetting(true)}
                            >
                                Forgot password?
                            </Button>
                            <Spacer />
                            <Button
                                colorScheme="teal"
                                type="submit"
                                marginTop="5px"
                            >
                                <Heading as="p" size="md">
                                    Sign In
                                </Heading>
                            </Button>
                        </Flex>
                    </Form>
                );
            }}
        </Formik>
    );
};
