import { Tag as TagType } from 'types';
import { Tag, TagLabel } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
type TagLinkProps = {
    tag: TagType;
};

const TagLink = ({ tag }: TagLinkProps) => {
    return (
        <Tag colorScheme="teal" key={tag.id}>
            <TagLabel>
                <Link to={`/tag/${tag.slug}`}>{tag.name}</Link>
            </TagLabel>
        </Tag>
    );
};

export default TagLink;
