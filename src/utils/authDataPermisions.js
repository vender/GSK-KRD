import { authProvider } from './authProvider';
import { supabase } from './supabase';

const authDataPermisions = {
    ...authProvider,
    async getPermissions() {
        try {
            const curentUser = supabase.auth.user();
            let { data: profiles, error } = await supabase
            .from('users')
            .select('role, email')
            .match({email: curentUser.email})
            .single()
            if(error) {
                throw error
            }
            if(profiles) return profiles.role
        } catch (e) {
            console.log('HandleGetPermission: no user is logged in or tokenResult error');
            return Promise.resolve('authenticated');
        }
    }
};

export default authDataPermisions;