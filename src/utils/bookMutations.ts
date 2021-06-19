import { supabase } from 'utils';
import * as T from 'types';

interface AuthorDB extends T.Author {
    created_by: string;
    created_at: string;
}

interface BookDB {
    author: number;
    title: string;
    created_by: string;
    created_at: string;
    id: number | null;
}

export const getAuthor = async (
    authorName: string,
    user: T.Profile
): Promise<T.Author | null> => {
    let author: T.Author | null = null;
    try {
        if (!user.userId) {
            throw new Error('Unauthorized');
        }
        const { data: exisitingAuthor, error: existingError } = await supabase
            .from<T.Author>('authors')
            .select('id, name')
            .eq('name', authorName)
            .limit(1);
        if (existingError) {
            throw existingError;
        }
        if (exisitingAuthor && exisitingAuthor.length) {
            author = exisitingAuthor[0];
        }
        const { data: newAuthor, error } = await supabase
            .from<AuthorDB>('authors')
            .insert([
                {
                    name: authorName,
                    created_by: user.userId,
                    created_at: new Date().toISOString(),
                },
            ])
            .single();
        if (error || !newAuthor) throw Error;
        author = { id: newAuthor.id, name: newAuthor.name };
    } catch (e) {
        console.log('unable to get author', e);
    }
    return author;
};

export const insertBook = async (
    book: T.NewBook,
    author: T.Author,
    user: T.Profile
): Promise<T.Book | null> => {
    let newBook: T.Book | null = null;
    try {
        const { data, error } = await supabase
            .from<BookDB>('books')
            .insert([
                {
                    author: author.id,
                    title: book.title,
                    created_by: user.userId,
                    created_at: new Date().toISOString(),
                },
            ])
            .single();
        if (error) {
            throw error;
        }
        if (data) {
            newBook = {
                author,
                title: data.title,
                id: data.id as number,
                createdBy: data.created_by,
                createdAt: data.created_at,
            };
        }
    } catch (e) {
        console.log('unable to insert book', e);
    }
    return newBook;
};
