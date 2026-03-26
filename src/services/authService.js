/**
 * Authentication Service
 * Quản lý JWT Access Token & Refresh Token
 * Sẵn sàng kết nối với Backend thật
 */

const TOKEN_KEY = "cineverse_access_token";
const REFRESH_KEY = "cineverse_refresh_token";
const USER_KEY = "cineverse_user";

// ── Quản lý Token ────────────────────────────────────────────────────────────
export const tokenManager = {
    getAccessToken: () => localStorage.getItem(TOKEN_KEY),
    getRefreshToken: () => localStorage.getItem(REFRESH_KEY),

    setTokens: (accessToken, refreshToken) => {
        localStorage.setItem(TOKEN_KEY, accessToken);
        if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
    },

    clearTokens: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getUser: () => {
        try {
            return JSON.parse(localStorage.getItem(USER_KEY));
        } catch {
            return null;
        }
    },

    setUser: (user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
};

// ── Auth API (mock - thay bằng API thật khi có BE) ──────────────────────────
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const USERS_STORAGE = "cineverse_users";

const generateMockToken = () =>
    "eyJ" + btoa(JSON.stringify({ exp: Date.now() + 3600000 })) + ".mock";

export const authAPI = {
    login: async (email, password) => {
        await delay(800);
        const users = JSON.parse(localStorage.getItem(USERS_STORAGE) || "[]");
        const user = users.find((u) => u.email === email && u.password === password);

        if (email === "admin@cineverse.com" && password === "admin123") {
            const adminUser = { name: "Admin Code", email, role: "admin" };
            const token = generateMockToken();
            return { user: adminUser, accessToken: token, refreshToken: "rf_" + token };
        }

        if (user) {
            const { password: _, ...safeUser } = user;
            const token = generateMockToken();
            return { user: safeUser, accessToken: token, refreshToken: "rf_" + token };
        }

        throw new Error("Invalid email or password");
    },

    register: async (name, email, password) => {
        await delay(800);
        const users = JSON.parse(localStorage.getItem(USERS_STORAGE) || "[]");
        if (users.find((u) => u.email === email)) throw new Error("Email already exists");

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem(USERS_STORAGE, JSON.stringify(users));

        const { password: _, ...safeUser } = newUser;
        const token = generateMockToken();
        return { user: safeUser, accessToken: token, refreshToken: "rf_" + token };
    },

    refreshToken: async () => {
        await delay(300);
        const currentRefresh = tokenManager.getRefreshToken();
        if (!currentRefresh) throw new Error("No refresh token");
        const newToken = generateMockToken();
        return { accessToken: newToken };
    },

    logout: () => {
        tokenManager.clearTokens();
    },
};
