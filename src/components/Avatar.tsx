import {
    Avatar as AvatarUI,
    HStack,
    FormLabel,
    Input,
    Text,
    AvatarBadge,
    IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { supabase } from 'utils';
import React, { useEffect, useState } from 'react';

interface AvatarProps {
    url: string | null;
    size?: string;
    onUpload?: Function;
}

const Avatar = ({ url, onUpload, size }: AvatarProps) => {
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (url) {
            downloadFile(url);
        } else {
            setAvatarUrl(null);
        }
    }, [url]);

    const downloadFile = async (path: string) => {
        try {
            const { data, error: downloadError } = await supabase.storage
                .from('avatars')
                .download(path);
            if (downloadError) {
                throw downloadError;
            }
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (e) {
            setError(e.message);
        }
    };

    const uploadAvatar = async (event: React.ChangeEvent<any>) => {
        if (!onUpload) return;
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }
            onUpload(filePath);
        } catch (e) {
            setError(e.message);
        } finally {
            setUploading(false);
        }
    };

    const removeAvatar = async () => {
        if (!onUpload || !url) return;
        try {
            setUploading(true);
            debugger;
            const { error: deleteError } = await supabase.storage
                .from('avatars')
                .remove([url]);
            if (deleteError) {
                throw deleteError;
            }
            onUpload(null);
        } catch (e) {
            setError(e.message);
        } finally {
            setUploading(false);
        }
    };

    if (error) {
        return <Text>{error}</Text>;
    }
    if (onUpload) {
        return (
            <HStack align="baseline" spacing="8">
                <AvatarUI bg="red.200" src={avatarUrl || undefined} size={size}>
                    <AvatarBadge background="transparent" boxSize="1em">
                        <IconButton
                            aria-label="Delete profile picture"
                            isRound
                            size="sm"
                            icon={<CloseIcon w="3" h="3" />}
                            onClick={() => removeAvatar()}
                        ></IconButton>
                    </AvatarBadge>
                </AvatarUI>
                <FormLabel htmlFor="upload">
                    {uploading ? 'Uploading...' : 'Upload'}
                </FormLabel>
                <Input
                    id="upload"
                    display="none"
                    type="file"
                    disabled={uploading}
                    accept="image/*"
                    onChange={(e) => uploadAvatar(e)}
                />
            </HStack>
        );
    }
    return <AvatarUI bg="red.200" src={avatarUrl || undefined} />;
};

export default Avatar;
