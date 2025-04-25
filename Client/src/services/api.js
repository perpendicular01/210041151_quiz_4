import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5001', // You can configure this in your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get the token from local storage
const getAuthToken = () => {
  return localStorage.getItem('access-token');
};

// Set the token for authenticated requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all tasks for the logged-in user (with optional filters)
export const getTasks = async (filters = {}) => {
  try {
    const response = await api.get('/tasks', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get task details by ID
export const getTaskDetails = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Edit a task
export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all users (admin-only)
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;
