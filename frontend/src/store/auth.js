import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },
  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/users/login', { email, password });
        if (response.data.success) {
          this.token = response.data.token;
          this.user = response.data.user;
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.user));
          return true;
        }
      } catch (error) {
        console.error('Login error', error);
        throw error;
      }
      return false;
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});
