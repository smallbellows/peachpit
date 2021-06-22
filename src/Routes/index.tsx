import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import SignIn from './SignIn';
import Home from './Home';
import Profile from './Profile';
import Book from './Book';
import EditBook from './EditBook';
import { useUser } from 'context/Auth';
import { useLoading } from 'context/Loading';
import FullSpinner from 'components/Shared/FullSpinner';
const AppRouter = () => {
    const user = useUser();
    const { isLoading } = useLoading();
    if (!user) {
        return <SignIn />;
    }
    return (
        <Box>
            {isLoading && <FullSpinner />}
            <Router>
                <Switch>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/book/:id/edit" children={<EditBook />} />
                    <Route path="/book/:id" children={<Book />}></Route>

                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </Box>
    );
};

export default AppRouter;
