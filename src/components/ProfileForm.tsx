import {
    SimpleGrid,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Text,
    Divider,
    Button,
    ButtonGroup,
} from '@chakra-ui/react';
import { useUser } from 'context/Auth';
import { useEffect, useState } from 'react';
import Avatar from 'components/Avatar';
import { supabase } from 'utils';
import { Redirect } from 'react-router-dom';
import { useLoading } from 'context/Loading';

const ProfileForm = () => {
    const user = useUser();
    const { isLoading, setIsLoading } = useLoading();
    const [username, setUsername] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        setUsername(user?.username || null);
        setAvatarUrl(user?.avatarUrl || null);
    }, [user]);

    const updateProfile = async (
        username: string | null,
        avatarUrl: string | null
    ) => {
        if (!username) return;
        setError(null);
        setIsLoading(true);
        const updates = {
            id: user?.userId,
            username,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };
        const { error: updateError } = await supabase
            .from('profiles')
            .upsert(updates, { returning: 'minimal' });
        if (updateError) {
            setError(updateError.message);
        } else {
            setIsLoading(false);
            setDone(true);
        }
    };

    if (!user) return null;
    if (error) return <Text>{error}</Text>;
    if (done && !isLoading) return <Redirect to="/" />;
    return (
        <SimpleGrid
            columns={1}
            rows="auto"
            gap="20px"
            width="75%"
            minWidth="300px"
            margin="0 auto"
        >
            <Heading as="h2" size="lg" color="gray.700">
                Hello friend!
            </Heading>
            <Text>Please update your profile!</Text>
            <Divider colorScheme="blackAlpha" size="md" />
            <FormControl isInvalid={!isLoading && !Boolean(username)}>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                    type="text"
                    id="username"
                    required
                    background="gray.50"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <Text>Profile Pic</Text>
                <Avatar
                    url={avatarUrl}
                    onUpload={(avatarPath: string) => setAvatarUrl(avatarPath)}
                    size="lg"
                />
            </FormControl>
            <ButtonGroup>
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => setDone(true)}
                >
                    Cancel
                </Button>
                <Button
                    colorScheme="teal"
                    onClick={() => updateProfile(username, avatarUrl)}
                >
                    Save Changes
                </Button>
            </ButtonGroup>
        </SimpleGrid>
    );
};

export default ProfileForm;
