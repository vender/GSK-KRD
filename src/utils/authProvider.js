import { supabaseAuthProvider } from 'ra-supabase';
import { supabase } from './supabase';

export const authProvider = supabaseAuthProvider(supabase, {
    getIdentity: async (user) => {
        
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .match({ email: user.email })
            .single();

        if (!data || error) {
            throw new Error();
        }

        return {
            ...data,
            fullName: data.name
        }
    }
});