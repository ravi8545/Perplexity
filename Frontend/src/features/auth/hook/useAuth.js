import { useDispatch } from "react-redux";
import { register, login, getMe, resendVerification, logout, forgotPassword, resetPassword, googleLogin } from "../service/auth.api.js";
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

    async function handleGoogleLogin() {
        return new Promise((resolve) => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));

                const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

                if (!window.google) {
                    dispatch(setError("Google Sign-In is not loaded yet. Please try again."));
                    dispatch(setLoading(false));
                    resolve({ success: false });
                    return;
                }

                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: async (response) => {
                        try {
                            const data = await googleLogin({ idToken: response.credential });

                            const userId = data.user?._id || data.user?.id;
                            if (!data.user || !userId) {
                                dispatch(setError("Invalid login response. User not found."));
                                dispatch(setLoading(false));
                                resolve({ success: false });
                                return;
                            }

                            dispatch(setUser({
                                ...data.user,
                                _id: data.user._id ?? data.user.id,
                            }));

                            initializeSocketConnection();
                            dispatch(setLoading(false));
                            resolve({ success: true });
                        } catch (error) {
                            const errorMessage = error.response?.data?.message || "Google login failed. Please try again.";
                            dispatch(setError(errorMessage));
                            dispatch(setLoading(false));
                            resolve({ success: false, message: errorMessage });
                        }
                    },
                });

                window.google.accounts.id.prompt((notification) => {
                    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        // One Tap not available, fall back to popup
                        window.google.accounts.oauth2.initCodeClient;
                        // Use the button-triggered popup instead
                        const buttonDiv = document.createElement('div');
                        buttonDiv.style.display = 'none';
                        document.body.appendChild(buttonDiv);

                        window.google.accounts.id.renderButton(buttonDiv, {
                            type: 'icon',
                            size: 'large',
                        });

                        const googleBtn = buttonDiv.querySelector('[role="button"]');
                        if (googleBtn) {
                            googleBtn.click();
                        }

                        // Cleanup after a delay
                        setTimeout(() => {
                            if (buttonDiv.parentNode) {
                                buttonDiv.parentNode.removeChild(buttonDiv);
                            }
                        }, 60000);

                        dispatch(setLoading(false));
                    }
                });
            } catch (error) {
                console.error('Google Login Error:', error);
                dispatch(setError("Google login failed. Please try again."));
                dispatch(setLoading(false));
                resolve({ success: false });
            }
        });
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleResendVerification,
        handleLogout,
        handleForgotPassword,
        handleResetPassword,
        handleGoogleLogin,
    };
}