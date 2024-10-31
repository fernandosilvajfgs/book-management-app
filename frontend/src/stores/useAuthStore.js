import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('adminToken'),
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:5000/login', { username, password });
        const { token } = response.data;
        if (token) {
          localStorage.setItem('adminToken', token);
          this.isAuthenticated = true;
          console.log('Login successful');
        }
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
      }
    },
    logout() {
      localStorage.removeItem('adminToken');
      this.isAuthenticated = false;
      console.log('Logged out successfully');
    }
  }
});
