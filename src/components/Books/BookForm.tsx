import * as T from 'types';
import { Formik, FormikProps, FieldProps, Form, Field } from 'formik';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    ButtonGroup,
    Button,
} from '@chakra-ui/react';

interface BookFormProps {
    book: T.Book;
    onSubmit: (book: T.Book) => void;
    onCancel: () => void;
}

interface BookEditFormValues {
    title: string;
    authorName: string;
    description?: string;
}
const BookForm = (props: BookFormProps) => {
    const { book, onSubmit, onCancel } = props;

    const initialValues: BookEditFormValues = {
        title: book?.title || '',
        authorName: book?.author.name || '',
        description: book?.description || '',
    };

    const handleSumbit = (values: BookEditFormValues) => {
        const author: T.Author = {
            ...book.author,
            name: values.authorName,
        };
        const bookToUpdate: T.Book = {
            ...book,
            author,
            title: values.title,
            description: values.description,
        };

        onSubmit(bookToUpdate);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSumbit}>
            {(props: FormikProps<BookEditFormValues>) => (
                <Form>
                    <ButtonGroup
                        mt="4"
                        mb="4"
                        display="flex"
                        justifyContent="flex-end"
                    >
                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </ButtonGroup>
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
                                <Textarea
                                    {...field}
                                    id="description"
                                    height="md"
                                />
                            </FormControl>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    );
};

export default BookForm;
