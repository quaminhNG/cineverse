import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { authAPI, tokenManager } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => tokenManager.getUser());
    const [loading, setLoading] = useState(true);

    // Kiểm tra phiên đăng nhập khi khởi động
    useEffect(() => {
        const token = tokenManager.getAccessToken();
        const savedUser = tokenManager.getUser();
        if (token && savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (email, password) => {
        const { user, accessToken, refreshToken } = await authAPI.login(email, password);
        tokenManager.setTokens(accessToken, refreshToken);
        tokenManager.setUser(user);
        setUser(user);
        return user;
    }, []);

    const register = useCallback(async (name, email, password) => {
        const { user, accessToken, refreshToken } = await authAPI.register(name, email, password);
        tokenManager.setTokens(accessToken, refreshToken);
        tokenManager.setUser(user);
        setUser(user);
        return user;
    }, []);

    const logout = useCallback(() => {
        authAPI.logout();
        setUser(null);
    }, []);

    const isAuthenticated = !!user;

    const value = useMemo(() => ({
        user,
        login,
        register,
        logout,
        isAuthenticated,
        loading,
    }), [user, login, register, logout, isAuthenticated, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
