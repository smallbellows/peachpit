import { Box, FormLabel, Input } from '@chakra-ui/react';
import CoverImage from 'components/Books/CoverImage';
import { useEffect, useState } from 'react';
import { usePrevious } from 'utils/usePrevious';

interface EditCoverImageProps {
    storedUrl?: string;
    file: File | null;
    setFile: (path: File | null) => void;
    isUploading: boolean;
}
const EditCoverImage = (props: EditCoverImageProps) => {
    const { storedUrl, file, setFile, isUploading } = props;
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const previousSrc = usePrevious(imgSrc);
    useEffect(() => {
        if (
            previousSrc &&
            previousSrc !== imgSrc &&
            previousSrc !== storedUrl
        ) {
            URL.revokeObjectURL(previousSrc);
        }
        return () => {
            imgSrc && URL.revokeObjectURL(imgSrc);
        };
    }, [previousSrc, imgSrc, storedUrl]);

    useEffect(() => {
        if (file) {
            setImgSrc(URL.createObjectURL(file));
        } else {
            setImgSrc(storedUrl || null);
        }
    }, [storedUrl, file]);

    return (
        <Box>
            <CoverImage imagePath={imgSrc} />
            <FormLabel htmlFor="upload">
                {isUploading ? 'Uploading...' : 'Upload'}
            </FormLabel>
            <Input
                id="upload"
                display="none"
                type="file"
                disabled={isUploading}
                accept="image/*"
                onChange={(e) => {
                    if (!e.target.files || e.target.files.length === 0) {
                        return;
                    }
                    setFile(e.target.files[0]);
                }}
            />
        </Box>
    );
};

export default EditCoverImage;
