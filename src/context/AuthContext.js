import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(() => {
        const access = localStorage.getItem('access_token');
        const refresh = localStorage.getItem('refresh_token');
        return access && refresh ? { access, refresh } : null;
    });
    const [loading, setLoading] = useState(true);

    const loginUser = async (email, password) => {
        try {
            const response = await api.post('/api/token/', { email, password });
            if (response.status === 200) {
                const { access, refresh } = response.data;
                setAuthTokens({ access, refresh });
                setUser({ email }); // You might decode the token here to get user ID or name
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);
                return { success: true };
            }
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, error: error.response?.data?.detail || "Login failed" };
        }
    };

    const logoutUser = async () => {
        const refresh = localStorage.getItem('refresh_token');
        if (refresh) {
            try {
                await api.post('api/token/blacklist/', { refresh });
            } catch (error) {
                console.error("Blacklist failed", error);
            }
        }

        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    useEffect(() => {
        // Here you could verify the token validity on mount if needed
        // Or decode the token to set the user state
        const access = localStorage.getItem('access_token');
        if (access) {
            // Placeholder: Set user state if token exists. 
            // In a real app, decode the JWT payload to get user details.
            setUser({ loggedIn: true });
        }
        setLoading(false);
    }, []);

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
        loading
    };

    return (
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
