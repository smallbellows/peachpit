import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Home from './Home';
import Profile from './Profile';
import { useUser } from 'context/Auth';

const AppRouter = () => {
    const user = useUser();
    if (!user) {
        return <SignIn />;
    }
    return (
        <Router>
            <Switch>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;
