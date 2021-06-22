import * as T from 'types';
import {
    Formik,
    FormikProps,
    FieldProps,
    Form,
    Field,
    FormikHandlers,
    FormikHelpers,
} from 'formik';
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
    onSubmit: (
        book: T.Book,
        actions: FormikHelpers<BookEditFormValues>
    ) => void;
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

    const handleSumbit = (
        values: BookEditFormValues,
        actions: FormikHelpers<BookEditFormValues>
    ) => {
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

        onSubmit(book, actions);
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
                                <Textarea
                                    {...field}
                                    id="description"
                                    height="md"
                                />
                            </FormControl>
                        )}
                    </Field>
                    <ButtonGroup>
                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </ButtonGroup>
                </Form>
            )}
        </Formik>
    );
};

export default BookForm;
