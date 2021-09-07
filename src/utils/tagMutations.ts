import { supabase } from 'utils';
import * as T from 'types';

export const tagBook = async (
    bookId: number,
    tags: T.Tag[] | null | undefined,
    user: T.Profile
): Promise<void> => {
    const { error: deleteError } = await supabase
        .from('books_tags')
        .delete()
        .eq('book_id', bookId);
    if (deleteError) {
        throw deleteError;
    }
    if (tags) {
        const params = tags.map((tag) => ({
            book_id: bookId,
            tag_id: tag.id,
            user_id: user.userId,
        }));
        const { error: insertError } = await supabase
            .from('books_tags')
            .insert(params, { returning: 'minimal' });
        if (insertError) {
            throw insertError;
        }
    }
    return;
};

export const insertTag = async (
    tagName: string,
    user: T.Profile
): Promise<T.Tag | null> => {
    if (!user) return null;

    try {
        const tag = { name: tagName, user_id: user.userId };
        const { data, error } = await supabase.from('tags').insert(tag);
        if (data && data.length) {
            return data[0];
        }
        if (error) throw error;
    } catch (e) {
        console.log(e);
    }
    return null;
};
