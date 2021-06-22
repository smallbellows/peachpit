import * as T from 'types';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    FieldProps,
    Form,
    Field,
} from 'formik';
import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

interface BookFormProps {
    book?: T.Book;
    onSubmit: (book: T.Book) => void;
    onCancel: () => void;
}

interface BookEditFormValues {
    title: string;
    authorName: string;
    description?: string;
    coverUrl?: string;
}
const BookForm = (props: BookFormProps) => {
    const { book, onSubmit } = props;

    const initialValues: BookEditFormValues = {
        title: book?.title || '',
        authorName: book?.author.name || '',
        description: book?.description || '',
        coverUrl: book?.cover_url || '',
    };

    return (
        <Formik initialValues={initialValues} onSubmit={() => {}}>
            {(props: FormikProps<BookEditFormValues>) => (
                <Form>
                    <Field name="title">
                        {({
                            field,
                            form,
                        }: FieldProps<string, BookEditFormValues>) => (
                            <FormControl
                                isInvalid={Boolean(
                                    form.touched.title && form.errors.title
                                )}
                            >
                                <FormLabel htmlFor="title">
                                    <Input {...field} id="title" />
                                </FormLabel>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="authorName">
                        {({
                            field,
                            form,
                        }: FieldProps<string, BookEditFormValues>) => (
                            <FormControl
                                isInvalid={Boolean(
                                    form.touched.authorName &&
                                        form.errors.authorName
                                )}
                            >
                                <FormLabel htmlFor="authorName">
                                    <Input {...field} id="authorName" />
                                </FormLabel>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="description">
                        {({
                            field,
                            form,
                        }: FieldProps<string, BookEditFormValues>) => (
                            <FormControl
                                isInvalid={Boolean(
                                    form.touched.description &&
                                        form.errors.description
                                )}
                            >
                                <FormLabel htmlFor="description"></FormLabel>
                                <Textarea {...field} id="description" />
                            </FormControl>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    );
};

export default BookForm;
