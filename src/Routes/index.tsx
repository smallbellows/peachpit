import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';
import SignIn from './SignIn';
import Home from './Home';
import Profile from './Profile';
import Book from './Book';
import EditBook from './EditBook';
import { useUser } from 'context/Auth';
import { useLoading } from 'context/Loading';
import { BooksProvider } from 'context/Books';

import FullSpinner from 'components/Shared/FullSpinner';
import { UpdatePassword } from './UpdatePassword';
import { useEffect, useState } from 'react';
const motionProps = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
    transition: {
        ease: 'easeInOut',
        duration: 1,
        type: 'tween',
    },
};
const AppRouter = () => {
    const user = useUser();
    const { isLoading } = useLoading();
    const [recoveryToken, setRecoveryToken] = useState<string | null>(null);

    useEffect(() => {
        const hashParams = new URLSearchParams(
            window.location.hash.replace('#', '')
        );
        if (hashParams.get('type') === 'recovery') {
            setRecoveryToken(hashParams.get('access_token'));
        } else {
            setRecoveryToken(null);
        }
    }, []);

    return (
        <Box>
            {isLoading && <FullSpinner />}
            <BooksProvider>
                <Router>
                    <Route
                        render={({ location }: any) => {
                            if (recoveryToken) {
                                return (
                                    <UpdatePassword
                                        recoveryToken={recoveryToken}
                                        clearToken={() =>
                                            setRecoveryToken(null)
                                        }
                                    />
                                );
                            }
                            if (!user) {
                                return <SignIn />;
                            }
                            return (
                                <AnimatePresence
                                    exitBeforeEnter
                                    initial={false}
                                >
                                    <Switch
                                        location={location}
                                        key={location.key}
                                    >
                                        <Route exact path="/signin">
                                            <motion.div {...motionProps}>
                                                <SignIn />
                                            </motion.div>
                                        </Route>

                                        <Route path="/profile">
                                            <motion.div {...motionProps}>
                                                <Profile />
                                            </motion.div>
                                        </Route>

                                        <Route
                                            path="/book/:id/edit"
                                            children={
                                                <motion.div {...motionProps}>
                                                    <EditBook />
                                                </motion.div>
                                            }
                                        />
                                        <Route
                                            path="/book/:id"
                                            children={
                                                <motion.div {...motionProps}>
                                                    <Book />
                                                </motion.div>
                                            }
                                        ></Route>

                                        <Route exact path="/">
                                            <motion.div {...motionProps}>
                                                <Home />
                                            </motion.div>
                                        </Route>
                                    </Switch>
                                </AnimatePresence>
                            );
                        }}
                    />
                </Router>
            </BooksProvider>
        </Box>
    );
};

export default AppRouter;
