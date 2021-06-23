import { useState } from 'react';
import { FormControl, Input, FormLabel, Button, Text } from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
type RequestValues = {
    name: string;
    email: string;
};

const encode = (data: any) => {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
};
const RequestForm = () => {
    const initialValues: RequestValues = {
        name: '',
        email: '',
    };
    const [isSuccess, setIsSuccess] = useState(false);
    const handleSubmit = (
        values: RequestValues,
        actions: FormikHelpers<RequestValues>
    ) => {
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({ 'form-name': 'request', ...values }),
        })
            .then(() => {
                actions.setSubmitting(false);
                setIsSuccess(true);
            })
            .catch((e) => console.log(e));
    };
    if (isSuccess) {
        return (
            <Text>
                Your request has been submitted. If accepted, you'll get an
                invitation to the email provided. This is a manaul process so
                please be patient.
            </Text>
        );
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {() => {
                    return (
                        <Form>
                            <Field name="name">
                                {({ field, form }: FieldProps) => (
                                    <FormControl
                                        isInvalid={Boolean(
                                            form.errors.name &&
                                                form.touched.name
                                        )}
                                    >
                                        <FormLabel htmlFor="name">
                                            Name
                                        </FormLabel>
                                        <Input
                                            id="name"
                                            required
                                            background="gray.50"
                                            {...field}
                                        />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="email">
                                {({ field, form }: FieldProps) => (
                                    <FormControl
                                        isInvalid={Boolean(
                                            form.errors.email &&
                                                form.touched.email
                                        )}
                                    >
                                        <FormLabel htmlFor="email">
                                            Email Address
                                        </FormLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            background="gray.50"
                                            {...field}
                                        />
                                    </FormControl>
                                )}
                            </Field>
                            <input
                                type="hidden"
                                name="form-name"
                                value="request"
                            />
                            <Button type="submit" m="2">
                                Submit Request
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
            <Text>
                It might be a few days before I grant your request. If you know
                a better way to get ahold of me, please reach out directly. If I
                don't know you, I'll just delete your name and email from my
                system. If I do know you, I'll send the invite and then delete
                your name and email from the place where this contact form
                submits to.{' '}
            </Text>
            <Text>
                Data sent by this form is sent to Netlify. If you don't want
                your data being sent or stored there, please don't use this
                form. If you submit the form, I'll assume you're okay with it.
            </Text>
        </>
    );
};

export default RequestForm;
