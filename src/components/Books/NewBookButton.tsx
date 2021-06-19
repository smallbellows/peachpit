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

    return (
        <>
            <Button colorScheme="teal" onClick={() => onOpen()}>
                Add A New Book
            </Button>
            <Drawer onClose={onClose} isOpen={isOpen} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Heading>Add new book</Heading>
                    </DrawerHeader>
                    <DrawerBody>
                        <NewBookForm formId={FORM_ID} onComplete={onClose} />
                    </DrawerBody>
                    <DrawerFooter>
                        <ButtonGroup>
                            <Button
                                colorScheme="teal"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                colorScheme="teal"
                                form={FORM_ID}
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
