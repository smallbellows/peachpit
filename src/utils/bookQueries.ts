import { supabase } from 'utils';
import * as T from 'types';

export const getBook = async (id: number): Promise<T.Book | null> => {
    let book: T.Book | null = null;
    try {
        const { data, error } = await supabase.from<T.Book>('books').select(`
            id,
            title,
            cover_url,
            description,
            created_by,
            created_at,
            author: author (
                name,
                id
            ),
            tags (
                id,
                name
            )
        `);
        if (error) throw error;
        if (Array.isArray(data) && data.length) {
            book = data[0];
        }
    } catch (e) {
        console.log(`unable to query book ${id}`, e);
    }
    return book;
};

export const getAllBooks = async (): Promise<T.Book[]> => {
    let books: T.Book[] = [];
    try {
        const { data, error } = await supabase.from<T.Book>('books').select(`
            id,
            title,
            cover_url,
            author: authors (
                name,
                id
            ),
            tags (
                id,
                name
            )
        `);
        if (error) throw error;
        debugger;
        if (data) books = data;
    } catch (e) {
        console.log('unable to get books', e);
    }
    return books;
};

export const getAllTags = async (): Promise<T.Tag[]> => {
    let tags: T.Tag[] = [];
    try {
        const { data, error } = await supabase.from<T.Tag>('tags').select(`
            id,
            name
        `);
        if (error) throw error;
        if (data) tags = data;
    } catch (e) {
        console.log('unable to get tags', e);
    }
    return tags;
};
