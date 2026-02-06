const USERS_KEY = "cineverse_users";
const CURRENT_USER_KEY = "cineverse_current_user";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuth = {
    login: async (email, password) => {
        await delay(1000);

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

        const user = users.find(u => u.email === email && u.password === password);

        if (email === "admin@cineverse.com" && password === "admin123") {
            const adminUser = { name: "Admin Code", email, role: "admin" };
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
            return adminUser;
        }

        if (user) {
            const { password, ...userWithoutPassword } = user;
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
            return userWithoutPassword;
        }

        throw new Error("Invalid email or password");
    },

    register: async (name, email, password) => {
        await delay(1000);

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

        if (users.find(u => u.email === email)) {
            throw new Error("Email already exists");
        }

        const newUser = { name, email, password };
        users.push(newUser);

        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        const { password: _, ...userWithoutPassword } = newUser;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

        return userWithoutPassword;
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    }
};
