import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach access token to every request
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Handle access token refresh on 401
let refreshing = false;
let queue = [];

function flushQueue(err, token = null) {
  queue.forEach(p => (err ? p.reject(err) : p.resolve(token)));
  queue = [];
}

api.interceptors.response.use(
  response => response,
  async err => {
    const status = err.response?.status;
    const original = err.config;

    if (status === 401 && !original._retry) {
      if (refreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then(token => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      original._retry = true;
      refreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const resp = await axios.post(`${API_BASE}/auth/refresh`, { token: refreshToken });
        const newAccess = resp.data.token;
        const newRefresh = resp.data.refreshToken;

        if (!newAccess) throw new Error('Refresh failed');

        localStorage.setItem('token', newAccess);
        if (newRefresh) localStorage.setItem('refreshToken', newRefresh);

        original.headers.Authorization = `Bearer ${newAccess}`;
        flushQueue(null, newAccess);
        return api(original);

      } catch (refreshErr) {
        flushQueue(refreshErr, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshErr);

      } finally {
        refreshing = false;
      }
    }

    // fallback: unauthorized, force logout
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(err);
  }
);

export default api;
