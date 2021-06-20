import { Image, ImageProps } from '@chakra-ui/react';
import placeholderCover from './book-cover-placeholder.svg';

interface CoverImageProps extends ImageProps {
    imagePath?: string;
}
const CoverImage = (props: CoverImageProps) => {
    const { imagePath, ...rest } = props;
    const src = imagePath ? imagePath : placeholderCover;
    const alt = props.alt ? props.alt : 'placeholder image';
    return <Image src={src} alt={alt} {...rest} />;
};

export default CoverImage;
