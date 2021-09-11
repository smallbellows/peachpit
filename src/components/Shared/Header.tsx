import { useAuth } from 'context/Auth';
import { Link, NavLink } from 'react-router-dom';
import { HStack, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Avatar from 'components/Shared/Avatar';
import { useHistory } from 'react-router-dom';
import NewBookButton from 'components/Books/NewBookButton';
const Header = (): JSX.Element => {
    const auth = useAuth();
    const history = useHistory();
    if (!auth) return <span />;
    const { profile, logout } = auth;
    return (
        <HStack width="100%" spacing="8" justifyContent="flex-end">
            <NavLink to="/" exact activeStyle={{ display: 'none' }}>
                Home
            </NavLink>
            <NewBookButton />
            <Menu>
                <MenuButton>
                    <Avatar url={profile?.avatarUrl || ''} size="sm" />
                </MenuButton>
                <MenuList>
                    <MenuItem>
                        <Link to="/profile">Edit Profile</Link>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            logout(history);
                        }}
                    >
                        Log Out
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    );
};

export default Header;
