import { Image, ImageProps, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from 'utils';
import placeholderCover from './book-cover-placeholder.svg';

interface CoverImageProps extends ImageProps {
    imagePath: string | null;
}

const CoverImage = (props: CoverImageProps) => {
    const { imagePath, ...rest } = props;
    const [src, setSrc] = useState(placeholderCover);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const loadImage = async (path: string) => {
            let url = path;
            if (path.includes('http')) {
                setSrc(url);
                return;
            }
            setIsLoading(true);
            const { data, error } = await supabase.storage
                .from('covers')
                .download(path);
            if (error) {
                console.log('unable to load image');
                setIsLoading(false);
                return;
            }
            url = URL.createObjectURL(data);
            setSrc(url);
            setIsLoading(false);
        };
        if (imagePath) {
            loadImage(imagePath);
        }
    }, [imagePath]);
    const alt = props.alt ? props.alt : 'book cover image';
    if (isLoading) {
        return <Box bg="gray.100" />;
    }
    return <Image {...rest} src={src} alt={alt} />;
};

export default CoverImage;
