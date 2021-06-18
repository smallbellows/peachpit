import {
    Session as sbSession,
    User as sbUser,
    UserCredentials as sbUserCredentials,
} from '@supabase/supabase-js';

export interface Session extends sbSession {}
export interface User extends sbUser {}
export interface UserCredentials extends sbUserCredentials {}

export interface Profile {
    userId: string;
    email: string;
    avatarUrl?: string;
    username?: string;
}

export interface Auth {
    profile: Profile | null;
    login: Function;
    logout: Function;
}

export interface LoadingContext {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}
