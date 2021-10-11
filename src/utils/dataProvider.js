import { supabaseDataProvider } from 'ra-supabase';
import { supabase } from './supabase';

export const resources = {
    users: {
        fields: ['id', 'name', 'phone', 'adress', 'dolya', 'data', 'boxnum', 'moneydate', 'member', 'dolg', 'about', 'email', 'role'],
        fullTextSearchFields: ['name', 'id'],
    },
    garaji: { 
        fields: ['id', 'createdby', 'number', 'square', 'user', 'updatedby', 'created_at', 'updated_at'],
        fullTextSearchFields: ['number'],
    },
    docks: ['id', 'files', 'src', 'name', 'fullurl', 'created_at', 'updated_at'],
}

export const dataProvider = supabaseDataProvider(supabase, resources);