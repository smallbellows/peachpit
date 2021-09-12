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
import { useUser, useAuth } from 'context/Auth';
import { useEffect, useState } from 'react';
import Avatar from 'components/Shared/Avatar';
import PasswordInputs from 'components/Shared/PasswordInputs';
import { supabase } from 'utils';
import { useHistory } from 'react-router-dom';
import { useLoading } from 'context/Loading';

type ProfileFormProps = {
    view: 'new' | 'edit';
};

const ProfileForm = ({ view }: ProfileFormProps) => {
    const user = useUser();
    const auth = useAuth();
    const { isLoading, setIsLoading } = useLoading();
    const [username, setUsername] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [hasPasswordError, setHasPasswordError] = useState(false);

    const history = useHistory();
    useEffect(() => {
        setUsername(user?.username || null);
        setAvatarUrl(user?.avatarUrl || null);
    }, [user]);

    const setUserPassword = async (): Promise<boolean> => {
        if (!password || hasPasswordError) {
            return false;
        }
        let isUpdated = true;
        auth?.setPassword(password).catch(() => {
            isUpdated = false;
        });
        return isUpdated;
    };

    const updateProfile = async (
        username: string | null,
        avatarUrl: string | null
    ) => {
        if (!username) return;
        if (view === 'new') {
            const isPasswordSet = await setUserPassword();
            if (!isPasswordSet) return;
        }

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
        setIsLoading(false);
        if (updateError) {
            setError(updateError.message);
        } else {
            history.replace('/');
        }
    };

    if (!user) return null;
    if (error) return <Text>{error}</Text>;
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
            {view === 'new' && (
                <PasswordInputs
                    setPassword={setPassword}
                    setHasError={setHasPasswordError}
                />
            )}
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
                    onClick={() => history.replace('/')}
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
