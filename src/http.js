import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens } from './util';

const client = axios.create({
  baseURL: '/api',
});

client.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.config.url === '/login') {
      return Promise.reject(error);
    }

    const refresh_token = getRefreshToken();
    if (!refresh_token) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refresh(refresh_token);
        const { tokens } = response.data;
        saveTokens(tokens);

        // Retry the original request with the refreshed token
        originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`;
        return client(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const login = async (email, password) => {
  const response = await client.post('/login', { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await client.post('/register', { email, password });
  return response.data;
};

export const refresh = async (refresh_token) => {
  const response = await client.post('/refresh', { refresh_token });
  return response.data;
};

export const fetchTasks = async () => {
  const response = await client.get('/auth/tasks');
  return response.data;
};

export const fetchTask = async (id) => {
  const response = await client.get(`/auth/tasks/${id}`);
  return response.data;
};

export const createTask = async (name) => {
  const response = await client.post('/auth/tasks', { name });
  return response.data;
};

export const completeTask = async (id) => {
  const response = await client.put(`/auth/tasks/${id}`);
  return response.data;
};

export const deleteTask = (id) => client.delete(`/auth/tasks/${id}`);

export const deleteTaskHistory = (taskId, historyId) =>
  client.delete(`/auth/tasks/${taskId}/history/${historyId}`);
