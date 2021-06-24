import * as T from 'types';
import { Formik, FormikProps, FieldProps, Form, Field } from 'formik';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    ButtonGroup,
    Button,
    Box,
} from '@chakra-ui/react';
import EditCoverImage from 'components/Books/EditCoverImage';
import { useState } from 'react';
import { supabase, updateBook } from 'utils';

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
    const [file, setFile] = useState<File | null>(null);
    const initialValues: BookEditFormValues = {
        title: book?.title || '',
        authorName: book?.author.name || '',
        description: book?.description || '',
    };

    const handleSumbit = async (values: BookEditFormValues) => {
        let coverUrl = '';
        if (file) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('covers')
                .upload(filePath, file);
            if (uploadError) {
                throw uploadError;
            }
            coverUrl = filePath;
        }
        const author: T.Author = {
            ...book.author,
            name: values.authorName,
        };
        const bookToUpdate: T.Book = {
            ...book,
            author,
            title: values.title,
            description: values.description,
            cover_url: coverUrl ? coverUrl : book.cover_url,
        };

        onSubmit(bookToUpdate);
    };

    return (
        <Box>
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
                                    <Textarea {...field} id="description" />
                                </FormControl>
                            )}
                        </Field>
                    </Form>
                )}
            </Formik>
            <EditCoverImage
                storedUrl={book.cover_url}
                file={file}
                setFile={setFile}
                isUploading={false}
            />
        </Box>
    );
};

export default BookForm;
