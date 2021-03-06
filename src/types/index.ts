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
    resetPassword: Function;
    updatePassword: Function;
    setPassword: Function;
}

export interface LoadingContext {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

export interface Author {
    id: number;
    name: string;
}

export interface NewBook {
    title: string;
    author: string;
}

export interface Book {
    id: number;
    title: string;
    author: Author;
    created_by: string;
    created_at: string;
    description?: string;
    cover_url?: string;
    tags?: Tag[];
}

export interface Tag {
    id: number;
    name: string;
    slug?: string;
}

export interface BooksContext {
    books: Book[];
    addBook: (book: Book) => void;
    editBook: (book: Book) => void;
    deleteBook: (id: number) => void;
}

export interface TagsContext {
    tags: Tag[];
    addTag: (tag: Tag) => void;
}
