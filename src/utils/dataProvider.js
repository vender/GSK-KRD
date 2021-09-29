import { supabaseDataProvider } from 'ra-supabase';
import { supabase } from './supabase';

export const resources = {
    users: {
        fields: ['id', 'name', 'phone', 'adress', 'dolya', 'data', 'boxnum', 'moneydate', 'member', 'dolg', 'about'],
        fullTextSearchFields: ['name', 'id'],
    },
    garaji: ['id', 'number', 'square', 'user', 'created_at', 'updated_at'],
    docks: ['id', 'files', 'src', 'name', 'fullurl', 'created_at', 'updated_at'],
}

export const dataProvider = supabaseDataProvider(supabase, resources);