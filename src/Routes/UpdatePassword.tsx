import { SimpleGrid } from '@chakra-ui/react';
import { UpdatePasswordForm } from 'components/Auth/UpdatePasswordForm';
import Banner from 'components/Shared/Banner';
import { useAuth } from 'context/Auth';
import { useHistory } from 'react-router-dom';

type UpdatePasswordProps = {
    recoveryToken: string;
    clearToken: () => void;
};

export const UpdatePassword = ({
    recoveryToken,
    clearToken,
}: UpdatePasswordProps) => {
    const history = useHistory();
    const auth = useAuth();

    const handleUpdatePassword = (newPassword: string) => {
        auth?.updatePassword(recoveryToken, newPassword, history);
        clearToken();
    };
    return (
        <SimpleGrid rows={2} columns={1} spacingY="20px" m="5%">
            <Banner />
            <UpdatePasswordForm updatePassword={handleUpdatePassword} />
        </SimpleGrid>
    );
};
