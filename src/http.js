import axios from 'axios';

export const fetchTasks = async () => {
  const response = await axios.get('/api/tasks');
  return response.data;
};

export const fetchTask = async (id) => {
  const response = await axios.get(`/api/tasks/${id}`);
  return response.data;
};

export const createTask = async (name) => {
  const response = await axios.post('/api/tasks', { name });
  return response.data;
};

export const completeTask = async (id) => {
  const response = await axios.put(`/api/tasks/${id}`);
  return response.data;
};

export const deleteTask = (id) => axios.delete(`/api/tasks/${id}`);

export const deleteTaskHistory = (id) =>
  axios.delete(`/api/tasks/history/${id}`);
