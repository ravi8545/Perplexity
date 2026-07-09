import { useDispatch } from "react-redux";
import { register, login, getMe, resendVerification, logout, forgotPassword, resetPassword } from "../service/auth.api.js";
import { setUser, setLoading, setError, logout as logoutAction } from "../auth.slice.js";
import { initializeSocketConnection } from "../../chat/service/chat.socket.js";

export function useAuth() {
    const dispatch = useDispatch();


    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await register({ email, username, password });
            // Don't set user - they need to verify email first
            return { success: true, data };

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            dispatch(setError(errorMessage));
            return { success: false, message: errorMessage };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login({ email, password });
            
            const userId = data.user?._id || data.user?.id;
            if (!data.user || !userId) {
                dispatch(setError("Invalid login response. User not found."));
                return;
            }
            
            console.log('Login successful:', data.user);
            dispatch(setUser({
                ...data.user,
                _id: data.user._id ?? data.user.id,
            }));

            // Initialize socket connection after successful login
            console.log('Initializing socket connection...');
            initializeSocketConnection();

        } catch (error) {
            console.log('Login error:', error);
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            dispatch(setError(errorMessage));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));

            const data = await getMe();
            console.log('GetMe successful:', data.user);
            dispatch(setUser(data.user));
        } catch (error) {
            console.log('GetMe failed:', error.response?.status, error.response?.data);
            if (error.response?.status !== 401) {
                dispatch(setError(error.response?.data?.message || "Failed to fetch user details."));
            }
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleResendVerification({ email }) {
        try {
            const data = await resendVerification({ email });
            return { success: true, message: data.message };
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to resend verification email.";
            return { success: false, message: errorMessage };
        }
    }

    async function handleLogout() {
        try {
            await logout();
            dispatch(logoutAction());
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            // Even if API fails, clear local state
            dispatch(logoutAction());
            return { success: false, message: error.response?.data?.message || "Logout failed." };
        }
    }

    async function handleForgotPassword({ email }) {
        try {
            const data = await forgotPassword({ email });
            return { success: true, message: data.message };
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to send reset email. Please try again.";
            return { success: false, message: errorMessage };
        }
    }

    async function handleResetPassword({ token, newPassword }) {
        try {
            const data = await resetPassword({ token, newPassword });
            return { success: true, message: data.message };
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
            return { success: false, message: errorMessage };
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleResendVerification,
        handleLogout,
        handleForgotPassword,
        handleResetPassword,
    };
}