import { authProvider } from './authProvider';
import { supabase } from './supabase';

const authDataPermisions = {
    ...authProvider,
    async getPermissions() {
        const curentUser = supabase.auth.user();
        let { data: profiles, error } = await supabase
        .from('profiles')
        .select('role, email')
        .match({email: curentUser.email})
        .single()
        // console.log(profiles.role);
        if(error) {
            throw error
        }
        if(profiles) return profiles.role
        return 'authenticated';
    }
};

export default authDataPermisions;