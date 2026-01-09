// Frontend Routes
export const ROUTES = {
  // Public routes
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',

  // Auth routes
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  RESET_PASSWORD: '/auth/reset-password',

  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    ORDERS: '/admin/orders',
    PRODUCTS: '/admin/products',
    USERS: '/admin/users',
    PROFILE: '/admin/profile',
  },
};
