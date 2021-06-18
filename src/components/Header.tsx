import { useAuth } from 'context/Auth';
import { Link } from 'react-router-dom';
import { HStack, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Avatar from 'components/Avatar';
const Header = (): JSX.Element => {
    const auth = useAuth();
    if (!auth) return <span />;
    const { profile, logout } = auth;
    return (
        <HStack width="100%" spacing="8" justifyContent="flex-end">
            <Menu>
                <MenuButton>
                    <Avatar url={profile?.avatarUrl || ''} size="sm" />
                </MenuButton>
                <MenuList>
                    <MenuItem>
                        <Link to="/profile">Edit Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={() => logout()}>Log Out</MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    );
};

export default Header;
