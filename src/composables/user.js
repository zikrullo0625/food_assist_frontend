import axios from 'axios';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const ENTERS_KEY = 'enters';

let inMemoryToken = null;
let inMemoryUser = null;
let enters = null;

export default {
    async setToken(token) {
        try {
            localStorage.setItem(TOKEN_KEY, token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            inMemoryToken = token;
        } catch (error) {
            console.error('Error setting token in LocalStorage:', error);
        }
    },

    async loadEnters() {
        if (enters !== null) return enters;

        try {
            const value = localStorage.getItem(ENTERS_KEY);
            enters = parseInt(value) || 0;
        } catch {
            enters = 0;
        }

        return enters;
    },

    async getEnters() {
        if (enters === null) {
            await this.loadEnters();
        }
        return enters;
    },

    async increaseEnters() {
        if (enters === null) {
            await this.loadEnters();
        }
        enters += 1;
        localStorage.setItem(ENTERS_KEY, enters.toString());
    },

    async getToken() {
        if (inMemoryToken) return inMemoryToken;

        try {
            const value = localStorage.getItem(TOKEN_KEY);
            if (!value) {
                console.log('Token not found in LocalStorage');
                return null;
            }
            inMemoryToken = value;
            return value;
        } catch (error) {
            console.error('Error retrieving token from LocalStorage:', error);
            return null;
        }
    },

    async clearToken() {
        try {
            localStorage.removeItem(TOKEN_KEY);
            delete axios.defaults.headers.common['Authorization'];
            inMemoryToken = null;
            console.log('Token successfully cleared');
        } catch (error) {
            console.error('Error clearing token from LocalStorage:', error);
        }
    },

    async setUser(user) {
        try {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            inMemoryUser = user;
        } catch (error) {
            console.error('Error setting user in LocalStorage:', error);
        }
    },

    async getUser() {
        if (inMemoryUser) return inMemoryUser;

        try {
            const value = localStorage.getItem(USER_KEY);
            if (!value) {
                console.log('User not found in LocalStorage');
                return null;
            }
            const parsed = JSON.parse(value);
            inMemoryUser = parsed;
            return parsed;
        } catch (error) {
            console.error('Error retrieving user from LocalStorage:', error);
            return null;
        }
    },

    async clearUser() {
        try {
            localStorage.removeItem(USER_KEY);
            inMemoryUser = null;
        } catch (error) {
            console.error('Error clearing user from LocalStorage:', error);
        }
    },

    async logout() {
        try {
            await axios.post(import.meta.env.VITE_API_URL + '/auth/logout');
        } catch (e) {
            console.error('Error during logout API call:', e);
        }

        await this.clearToken();
        await this.clearUser();
    },

    async isLoggedIn() {
        const token = await this.getToken();
        return !!token;
    },

    async loadSession() {
        const token = await this.getToken();
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return token;
    }
};
