import axios from 'axios';

export const fetchTasks = async () => {
  const response = await axios.get('/api/tasks');
  return response.data;
};

export const createTask = async (name) => {
  const response = await axios.post('/api/tasks', { name });
  return response.data;
};
