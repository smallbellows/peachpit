import { useState, useRef } from 'react';
import * as T from 'types';
import { useCombobox, useMultipleSelection } from 'downshift';
import {
    Tag,
    Stack,
    Input,
    List,
    ListItem,
    TagLabel,
    TagCloseButton,
    IconButton,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon, CloseIcon } from '@chakra-ui/icons';

interface TagPickerProps {
    tags: T.Tag[];
    allTags: T.Tag[];
    onSelection: (tags: T.Tag[]) => void;
    onCreateTag: (newTag: string) => Promise<T.Tag | null>;
}

const CREATE: T.Tag = { id: -1, name: 'CREATE' };

const PERMANENT_TAGS = ['Book Club Pick'];

const TagPicker = (props: TagPickerProps) => {
    const { tags, allTags, onCreateTag, onSelection } = props;

    const ref = useRef(null);

    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);

    const {
        getSelectedItemProps,
        getDropdownProps,
        addSelectedItem,
        removeSelectedItem,
        selectedItems,
    } = useMultipleSelection({
        initialSelectedItems: tags,
        itemToString: (item) => item.name,
        onSelectedItemsChange: (changes) => {
            onSelection(changes.selectedItems || []);
        },
    });
    const getFilteredItems = (allTags: T.Tag[]) => {
        const filtered = allTags.filter((item) => {
            const isSelected = selectedItems.map((i) => i.id).includes(item.id);
            return (
                !isSelected &&
                item.name.toLowerCase().startsWith(inputValue.toLowerCase())
            );
        });
        filtered.push(CREATE);
        return filtered;
    };

    const {
        isOpen,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
        closeMenu,
    } = useCombobox({
        inputValue,
        items: getFilteredItems(allTags),
        onStateChange: async ({
            inputValue: inputValRef,
            type,
            selectedItem,
        }) => {
            switch (type) {
                case useCombobox.stateChangeTypes.InputChange:
                    setInputValue(inputValRef || '');
                    break;
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    if (selectedItem) {
                        if (
                            selectedItem.id === CREATE.id &&
                            inputValue &&
                            inputValue.length
                        ) {
                            const newTag = await onCreateTag(inputValue);
                            setInputValue('');
                            if (newTag) {
                                addSelectedItem(newTag);
                                closeMenu();
                            }
                        } else {
                            setInputValue('');
                            addSelectedItem(selectedItem);
                            closeMenu();
                        }
                    }

                    break;
                default:
                    break;
            }
        },
    });
    return (
        <div>
            <Stack flexWrap="wrap" spacing="2" isInline>
                {selectedItems.map((selectedItem, index) => (
                    <Tag
                        mb={1}
                        key={`itemtag${selectedItem.id}`}
                        colorScheme="teal"
                        {...getSelectedItemProps({ selectedItem, index })}
                    >
                        <TagLabel>{selectedItem.name}</TagLabel>
                        {!PERMANENT_TAGS.includes(selectedItem.name) && (
                            <TagCloseButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeSelectedItem(selectedItem);
                                }}
                                aria-label="Remove this tag"
                            />
                        )}
                    </Tag>
                ))}
                <IconButton
                    aria-label="add more tags"
                    colorScheme="pink"
                    size="xs"
                    icon={<AddIcon />}
                    variant="ghost"
                    onClick={() => setShowInput(true)}
                />
            </Stack>

            <Stack isInline {...getComboboxProps()}>
                <InputGroup hidden={!showInput}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="gray.300" />}
                    />
                    <Input
                        placeholder="more tags"
                        {...getInputProps(
                            getDropdownProps({
                                preventKeyAction: isOpen,
                                ref,
                            })
                        )}
                    />

                    <InputRightElement
                        children={
                            <IconButton
                                icon={<CloseIcon />}
                                aria-label="cancel adding more tags"
                                isRound
                                size="xs"
                                onClick={() => setShowInput(false)}
                            />
                        }
                    />
                </InputGroup>
            </Stack>

            <List
                bg="white"
                borderRadius="4px"
                border={isOpen && '1px solid rgba(0,0,0,0.1)'}
                boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
                {...getMenuProps()}
            >
                {isOpen &&
                    getFilteredItems(allTags).map((item, index) => (
                        <ListItem
                            px={2}
                            py={1}
                            borderBottom="1px solid rgba(0,0,0,0.01)"
                            bg={
                                highlightedIndex === index
                                    ? 'gray.50'
                                    : 'inherit'
                            }
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item.id === CREATE.id
                                ? `Create new tag: ${inputValue}`
                                : item.name}
                        </ListItem>
                    ))}
            </List>
        </div>
    );
};

export default TagPicker;
