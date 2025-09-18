// Import Axios for HTTP requests
import axios from 'axios';

// Base URL for API calls
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

// Create Axios instance with default headers
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// -------------------- Request Interceptor --------------------
// Attach access token from localStorage to every outgoing request
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// -------------------- Response Interceptor --------------------
// Handle 401 errors and attempt token refresh
let refreshing = false;   // Flag to indicate ongoing refresh request
let queue = [];   // Queue to hold requests while refreshing

// Function to process queued requests after refresh completes
function flushQueue(err, token = null) {
  queue.forEach(p => (err ? p.reject(err) : p.resolve(token)));
  queue = [];
}

// Response interceptor
api.interceptors.response.use(
  response => response,   // Return successful response
  async err => {
    const status = err.response?.status;   // HTTP status code
    const original = err.config;   // Original request config

// Handle 401 Unauthorized (access token expired)
    if (status === 401 && !original._retry) {
      
// If already refreshing, queue this request
      if (refreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then(token => {
          
// Retry original request with new token
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

// Mark original request as retried
      original._retry = true;
      refreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

// Request new access token
        const resp = await axios.post(`${API_BASE}/auth/refresh`, { token: refreshToken });
        const newAccess = resp.data.token;
        const newRefresh = resp.data.refreshToken;

        if (!newAccess) throw new Error('Refresh failed');

// Save new tokens to localStorage
        localStorage.setItem('token', newAccess);
        if (newRefresh) localStorage.setItem('refreshToken', newRefresh);

// Retry original request with new access token
        original.headers.Authorization = `Bearer ${newAccess}`;
        flushQueue(null, newAccess);
        return api(original);

      } catch (refreshErr) {
        
// Refresh failed: clear tokens and force logout
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

// Fallback: Unauthorized, force logout for any other 401
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(err);   // Reject other errors
  }
);

export default api;
