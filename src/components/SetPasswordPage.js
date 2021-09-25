import { useLogout, useNotify, useRedirect } from 'react-admin';
import { SetPasswordPage } from 'ra-supabase-ui-materialui';

export const MySetPasswordPage = () => {
    const logout = useLogout();
    const notify = useNotify();
    const redirect = useRedirect();

    const handleSuccess = () => {
        notify(
            'Your password is set. Please sign in using those new credentials'
        );
        // Log out users so they are forced to use their new credentials
        logout();
    };

    const handleFailure = () => {
        notify(
            'An error occurred while setting the password. Please ask the person who invited you to send a new link.'
        );
        redirect('/login');
    };

    return (
        <SetPasswordPage>
            
        </SetPasswordPage>
    );
};