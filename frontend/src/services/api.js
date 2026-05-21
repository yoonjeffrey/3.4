import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true // Importante para enviar cookies
});

// jwt token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let csrfTokenFetched = false;

// csrf init
export const initCSRF = async () => {
  if (!csrfTokenFetched) {
    try {
      const response = await axios.get('/api/csrf-token', { withCredentials: true });
      const csrfToken = response.data.csrfToken;
      api.defaults.headers.common['CSRF-Token'] = csrfToken; // csurf uses csrf-token header
      csrfTokenFetched = true;
    } catch (error) {
      console.error('Error fetching CSRF token', error);
    }
  }
};

export default api;
