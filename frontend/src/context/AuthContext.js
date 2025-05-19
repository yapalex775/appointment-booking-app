import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import api from '../utils/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, accessToken: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refresh = async () => {
            const storedToken = localStorage.getItem('refreshToken');
            if (!storedToken) {
                setLoading(false);
                return;
            };
    
            try {
                const res = await api.post('/auth/refresh', { refreshToken: storedToken }, { skipAuthRefresh: true });
                const { accessToken } = res.data;
                const decoded = jwtDecode(accessToken);
                setAuth({ accessToken, user: {id: decoded.userId, email: decoded.email, name: decoded.name } });
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            } catch (err) {
                logout();
            } finally {
                setLoading(false);
            }
        };

        refresh();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password }, { skipAuthRefresh: true });
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem('refreshToken', refreshToken);
        
        const decoded = jwtDecode(accessToken);
        setAuth({ accessToken, user: {id: decoded.userId, name: decoded.name, email: decoded.email } });
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    };

    const logout = () => {
        localStorage.removeItem('refreshToken');
        setAuth({ accessToken: null, user: null });
        delete api.defaults.headers.common['Authorization'];
    };

    const register = async ({name, email, password}) => {
        await api.post('/auth/register', { name, email, password }, { skipAuthRefresh: true });
        await login(email, password);
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
