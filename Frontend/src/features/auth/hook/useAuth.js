import { useDispatch } from "react-redux";
import { register, login, getMe } from "../service/auth.api.js";
import { setUser, setLoading, setError } from "../auth.slice.js";
import { initializeSocketConnection } from "../../chat/service/chat.socket.js";

export function useAuth() {
    const dispatch = useDispatch();


    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true));
            const data = await register({ email, username, password });
            dispatch(setUser(data.user));

        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed. Please try again."));
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
            dispatch(setError(error.response?.data?.message || "Failed to fetch user details."));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
    };
}