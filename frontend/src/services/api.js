import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true // Importante para enviar cookies
});

// Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let csrfTokenFetched = false;

// Función para inicializar CSRF
export const initCSRF = async () => {
  if (!csrfTokenFetched) {
    try {
      const response = await axios.get('/api/csrf-token', { withCredentials: true });
      const csrfToken = response.data.csrfToken;
      api.defaults.headers.common['CSRF-Token'] = csrfToken; // csurf espera CSRF-Token (o X-CSRF-Token)
      csrfTokenFetched = true;
    } catch (error) {
      console.error('Error fetching CSRF token', error);
    }
  }
};

export default api;
