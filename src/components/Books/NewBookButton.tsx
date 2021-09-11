import { useState } from 'react';
import {
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    ButtonGroup,
    Button,
    DrawerContent,
    Heading,
} from '@chakra-ui/react';
import NewBookForm from 'components/Books/NewBookForm';

const FORM_ID = 'new-book-form';
const NewBookButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [submitting, setSubmitting] = useState(false);
    return (
        <>
            <Button onClick={() => onOpen()}>Add A New Book</Button>
            <Drawer onClose={onClose} isOpen={isOpen} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Heading>Add new book</Heading>
                    </DrawerHeader>
                    <DrawerBody>
                        <NewBookForm
                            formId={FORM_ID}
                            setSubmitting={setSubmitting}
                        />
                    </DrawerBody>
                    <DrawerFooter>
                        <ButtonGroup>
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                form={FORM_ID}
                                disabled={submitting}
                            >
                                Submit
                            </Button>
                        </ButtonGroup>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default NewBookButton;
