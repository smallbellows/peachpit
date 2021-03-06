import { createContext, useState, useEffect, useContext } from 'react';
import * as T from 'types';
import { supabase } from 'utils';
import { useLoading } from './Loading';
const AuthContext = createContext<null | T.Auth>(null);
AuthContext.displayName = 'AuthContext';

const UserContext = createContext<null | T.Profile>(null);
UserContext.displayName = 'UserContext';

async function getProfile(
    session: T.Session | null,
    setProfile: Function,
    setLoading: Function
) {
    const { user } = session || {};
    if (!user) {
        setProfile(null);
    } else {
        try {
            setLoading(true);
            const { data, error, status } = await supabase
                .from('profiles')
                .select('username, avatar_url')
                .eq('id', user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }
            const profile: T.Profile = {
                userId: user.id,
                email: user.email || '',
            };
            if (data) {
                profile.avatarUrl = data.avatar_url;
                profile.username = data.username;
            }
            setProfile(profile);
        } catch {
        } finally {
            setLoading(false);
        }
    }
}

const AuthProvider = ({ children }: any) => {
    const [session, setSession] = useState<null | T.Session>(null);
    const { setIsLoading } = useLoading();
    const [profile, setProfile] = useState<null | T.Profile>(null);

    useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    useEffect(() => {
        getProfile(session, setProfile, setIsLoading);
    }, [session, setIsLoading]);

    const login = (credentials: T.UserCredentials) => {
        return supabase.auth.signIn(credentials);
    };

    const logout = (history: any) => {
        history.replace('/');
        return supabase.auth.signOut();
    };

    const updatePassword = async (
        accessToken: string,
        password: string,
        history: any
    ) => {
        setIsLoading(true);
        const { error } = await supabase.auth.api.updateUser(accessToken, {
            password,
        });
        setIsLoading(false);
        if (error) {
            throw error;
        }

        history.replace('/');
    };

    const setPassword = async (password: string) => {
        const accessToken = session?.access_token;
        if (accessToken) {
            const { error } = await supabase.auth.api.updateUser(accessToken, {
                password,
            });
            if (error) {
                throw error;
            }
            return;
        }
        throw new Error('Unauthorized');
    };

    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) {
            throw error;
        }
        return;
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                resetPassword,
                profile,
                updatePassword,
                setPassword,
            }}
        >
            <UserContext.Provider value={profile}>
                {children}
            </UserContext.Provider>
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);
const useUser = () => useContext(UserContext);
export { AuthProvider, useAuth, useUser };
