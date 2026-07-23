import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { signupApi, loginApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);

    function saveAuth(tokenVal, userVal) {
        localStorage.setItem('token', tokenVal);
        localStorage.setItem('user', JSON.stringify(userVal));
        setToken(tokenVal);
        setUser(userVal);
    }

    function clearAuth() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }

    async function signup(name, email, password) {
        const res = await axios.post(signupApi, { name, email, password });
        const data = res.data;
        saveAuth(data.token, data.user);
        return data;
    }

    async function login(email, password) {
        const res = await axios.post(loginApi, { email, password });
        const data = res.data;
        saveAuth(data.token, data.user);
        return data;
    }

    function logout() {
        clearAuth();
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
