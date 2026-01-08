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

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    purchasePrice: 800,
    salePrice: 1200,
    margin: 400,
    stock: 10,
    isActive: true,
    images: ['https://via.placeholder.com/300'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest smartphone model',
    purchasePrice: 500,
    salePrice: 800,
    margin: 300,
    stock: 20,
    isActive: true,
    images: ['https://via.placeholder.com/300'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockOrders: Order[] = [];

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.email === email);
    if (user && password === 'password') {
      const token = `token_${user.id}_${Date.now()}`;
      localStorage.setItem('token', token);
      return { user, token };
    }
    throw new Error('Invalid credentials');
  },

  register: async (email: string, password: string, name: string): Promise<{ user: User; token: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      name,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    const token = `token_${newUser.id}_${Date.now()}`;
    localStorage.setItem('token', token);
    return { user: newUser, token };
  },

  getCurrentUser: async (): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const userId = token.split('_')[1];
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) throw new Error('User not found');
    return user;
  },

  updateProfile: async (data: { name?: string; email?: string }): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const userId = token.split('_')[1];
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) throw new Error('User not found');
    Object.assign(user, data);
    return user;
  },

  updatePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (oldPassword !== 'password') throw new Error('Invalid old password');
  },

  resetPassword: async (email: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

// Products API
export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockProducts.filter((p) => p.isActive);
  },

  getAllAdmin: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockProducts;
  },

  getById: async (id: string): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'margin'>): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const margin = data.salePrice - data.purchasePrice;
    const newProduct: Product = {
      ...data,
      id: String(mockProducts.length + 1),
      margin,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    if (data.salePrice !== undefined && data.purchasePrice !== undefined) {
      data.margin = data.salePrice - data.purchasePrice;
    }
    Object.assign(product, { ...data, updatedAt: new Date().toISOString() });
    return product;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    mockProducts.splice(index, 1);
  },
};

// Orders API
export const ordersAPI = {
  getAll: async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockOrders;
  },

  getById: async (id: string): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  },

  create: async (items: CartItem[], userId: string, userEmail: string): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const total = items.reduce((sum, item) => sum + item.product.salePrice * item.quantity, 0);
    const newOrder: Order = {
      id: String(mockOrders.length + 1),
      userId,
      userEmail,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockOrders.push(newOrder);
    return newOrder;
  },

  proceed: async (id: string): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    if (order.status !== 'pending') throw new Error('Order cannot be proceeded');
    order.status = 'proceeded';
    order.updatedAt = new Date().toISOString();
    order.items.forEach((item) => {
      const product = mockProducts.find((p) => p.id === item.product.id);
      if (product) {
        product.stock -= item.quantity;
      }
    });
    return order;
  },

  cancel: async (id: string): Promise<Order> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    if (order.status === 'cancelled') throw new Error('Order already cancelled');
    const wasProceeded = order.status === 'proceeded';
    order.status = 'cancelled';
    order.updatedAt = new Date().toISOString();
    if (wasProceeded) {
      order.items.forEach((item) => {
        const product = mockProducts.find((p) => p.id === item.product.id);
        if (product) {
          product.stock += item.quantity;
        }
      });
    }
    return order;
  },
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUsers;
  },

  getById: async (id: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const user = mockUsers.find((u) => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  create: async (data: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      ...data,
      id: String(mockUsers.length + 1),
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return newUser;
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.id === id);
    if (!user) throw new Error('User not found');
    Object.assign(user, data);
    return user;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');
    mockUsers.splice(index, 1);
  },
};

export default api;
