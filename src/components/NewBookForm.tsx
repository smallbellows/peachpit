import {
    Formik,
    FormikHelpers,
    FormikProps,
    FieldProps,
    Form,
    Field,
} from 'formik';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import * as T from 'types';
import { useUser } from 'context/Auth';
import { useBooks } from 'context/Books';
import { getAuthor, insertBook } from 'utils';

const initialValues: T.NewBook = {
    title: '',
    author: '',
};

interface NewBookFormProps {
    formId: string;
    onComplete: () => void;
}
const NewBookForm = ({ formId, onComplete }: NewBookFormProps) => {
    const user = useUser();
    const { addBook } = useBooks();

    const handleSumbit = async (
        values: T.NewBook,
        actions: FormikHelpers<T.NewBook>
    ) => {
        if (!user) return actions.setSubmitting(false);
        const author = await getAuthor(values.author, user);
        if (!author) return actions.setSubmitting(false);
        const newBook = await insertBook(values, author, user);
        if (newBook) {
            addBook(newBook);
        }
        return actions.setSubmitting(false);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSumbit}>
            {(props: FormikProps<T.NewBook>) => (
                <Form id={formId}>
                    <Field name="title">
                        {({ field, form }: FieldProps<string, T.NewBook>) => (
                            <FormControl
                                isInvalid={Boolean(
                                    form.touched.title && form.errors.title
                                )}
                            >
                                <FormLabel htmlFor="title">
                                    <Input
                                        {...field}
                                        id="title"
                                        placeholder="book title"
                                    />
                                </FormLabel>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="author">
                        {({ field, form }: FieldProps) => (
                            <FormControl
                                isInvalid={Boolean(
                                    form.touched.author && form.errors.author
                                )}
                            >
                                <FormLabel htmlFor="author">
                                    <Input
                                        {...field}
                                        id="author"
                                        placeholder="author"
                                    />
                                </FormLabel>
                            </FormControl>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    );
};

export default NewBookForm;
