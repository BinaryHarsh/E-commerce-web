import axios from 'axios';
import type { User, Product, Order, CartItem } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', { email, password });
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    return { user, token };
  },

  register: async (email: string, password: string, name: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register', { email, password, name });
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    return { user, token };
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: { name?: string; email?: string }): Promise<User> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  updatePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await api.put('/auth/password', { oldPassword, newPassword });
  },

  resetPassword: async (email: string): Promise<void> => {
    await api.post('/auth/reset-password', { email });
  },
};

// Products API
export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  getAllAdmin: async (): Promise<Product[]> => {
    const response = await api.get('/admin/products');
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'margin'>): Promise<Product> => {
    const response = await api.post('/admin/products', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/admin/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/products/${id}`);
  },
};

// Orders API
export const ordersAPI = {
  getAll: async (): Promise<Order[]> => {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  getById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  create: async (items: CartItem[], shippingInfo: any): Promise<Order> => {
    const response = await api.post('/orders', { items, shippingInfo });
    return response.data;
  },

  proceed: async (id: string): Promise<Order> => {
    const response = await api.put(`/admin/orders/${id}/proceed`);
    return response.data;
  },

  cancel: async (id: string): Promise<Order> => {
    const response = await api.put(`/admin/orders/${id}/cancel`);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  create: async (data: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const response = await api.post('/admin/users', data);
    return response.data;
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/users/${id}`);
  },
};

export default api;
