export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  margin: number;
  stock: number;
  isActive: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'proceeded' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}
