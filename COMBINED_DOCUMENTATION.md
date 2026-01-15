# E-Commerce Web Application - Complete Documentation

**Version**: 1.0.0  
**Last Updated**: 2024

---

# Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Start Guide](#quick-start-guide)
3. [Architecture & Implementation](#architecture--implementation)
4. [Detailed Documentation](#detailed-documentation)

---

# Project Overview

# E-Commerce Web Application

A modern, full-featured e-commerce web application built with React, TypeScript, and cutting-edge frontend technologies. This application provides a complete shopping experience for end-users and comprehensive management tools for administrators.

## 🚀 Tech Stack

- **React 18** + **Vite** - Fast development and optimized production builds
- **TypeScript** - Type-safe development with full IntelliSense support
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Beautiful, accessible component library built on Radix UI
- **Redux Toolkit** - State management for cart (persisted) and authentication
- **React Router v6** - Declarative routing with protected routes
- **Formik + Yup** - Powerful form handling with schema validation
- **Sonner** - Elegant toast notifications
- **Axios** - HTTP client with interceptors for API calls
- **Prettier** - Consistent code formatting

## ✨ Features

### 👤 End User Features
- **Authentication System**
  - User registration and login
  - Password reset functionality
  - Profile management with password update
  - Secure token-based authentication

- **Product Browsing**
  - Browse all available products
  - View detailed product information
  - Out-of-stock indicators
  - Responsive product grid layout

- **Shopping Cart**
  - Add/remove products to cart
  - Update quantities
  - Persistent cart (survives page refresh)
  - Real-time total calculation

- **Checkout & Orders**
  - Secure checkout process
  - Shipping information form
  - Order placement with validation
  - Order history viewing

### 👨‍💼 Admin Features
- **Dashboard**
  - Revenue and profit overview
  - Order statistics
  - Quick access to all management sections

- **Orders Management**
  - View all orders with detailed information
  - Proceed orders (update status)
  - Cancel orders
  - Filter and search functionality

- **Products Management**
  - Create new products with images
  - Edit existing products
  - Delete products
  - Toggle product visibility
  - Stock management

- **Users Management**
  - View all registered users
  - Create new user accounts
  - Edit user information
  - Delete user accounts

- **Admin Profile**
  - Update profile information
  - Change password
  - View account details

## 📁 Project Structure

```
src/
├── app/
│   ├── store.ts          # Redux store configuration with persistence
│   └── hooks.ts          # Typed Redux hooks (useAppDispatch, useAppSelector)
│
├── components/
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Global header with navigation
│   │   ├── SidebarLayout.tsx  # Desktop sidebar navigation
│   │   └── DrawerLayout.tsx   # Mobile drawer navigation
│   ├── ui/               # shadcn/ui components (Button, Card, Input, etc.)
│   └── common/           # Shared components
│       └── ProtectedRoute.tsx  # Route protection with role-based access
│
├── contexts/
│   └── AuthContext.tsx   # Authentication context (legacy, now using Redux)
│
├── features/
│   ├── auth/             # Authentication Redux slice
│   │   └── authSlice.ts  # Login, register, profile management
│   ├── cart/             # Shopping cart Redux slice
│   │   └── cartSlice.ts  # Add, remove, update cart items (persisted)
│   ├── products/         # Products management
│   │   ├── productSlice.ts
│   │   └── ProductForm.tsx
│   ├── orders/           # Orders management
│   │   └── orderSlice.ts
│   └── users/            # User management
│       └── UserForm.tsx
│
├── pages/
│   ├── admin/            # Admin pages
│   │   ├── DashboardPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── UsersPage.tsx
│   │   └── AdminProfilePage.tsx
│   ├── auth/             # Authentication pages
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ResetPasswordPage.tsx
│   └── user/             # User-facing pages
│       ├── HomePage.tsx
│       ├── ProductsPage.tsx
│       ├── ProductDetailPage.tsx
│       ├── CartPage.tsx
│       ├── CheckoutPage.tsx
│       └── ProfilePage.tsx
│
├── routes/
│   ├── index.tsx         # Main routing configuration
│   └── routes.ts         # Centralized route constants
│
├── services/
│   ├── api.ts            # Axios instance with interceptors
│   └── apiUrls.ts        # Centralized API endpoint definitions
│
├── theme/
│   └── theme-provider.tsx  # Dark/Light mode theme provider
│
├── types/
│   └── index.ts          # TypeScript interfaces and types
│
└── utils/
    └── cn.ts             # Utility for combining class names
```

---

# Quick Start Guide

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** (or **yarn**)
- Backend API server running (see `API_DOCUMENTATION.md` for endpoint details)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
   
   Replace with your actual backend API URL.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Authentication Flow

1. **Login/Register**: User credentials are sent to the backend API
2. **Token Storage**: JWT token is stored in localStorage
3. **Redux State**: User data and authentication state are stored in Redux
4. **Auto Token Injection**: Axios interceptor automatically adds token to all API requests
5. **Protected Routes**: Routes are protected based on authentication status and user role
6. **Auto Logout**: On 401 errors, user is automatically logged out and redirected

## 🎨 Theme System

- **Dark/Light Mode**: Toggle between themes
- **System Preference**: Automatically detects system theme
- **Persistent**: Theme preference saved in localStorage
- **Accessible**: Full keyboard navigation support

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation with all features
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Hamburger menu with drawer navigation
- **Breakpoints**: Fully responsive across all screen sizes

## 🔄 State Management

### Redux Store Structure

```typescript
{
  cart: {
    items: CartItem[],
    total: number
  },
  auth: {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean
  }
}
```

- **Cart**: Persisted in localStorage (survives page refresh)
- **Auth**: Managed in Redux store (user data and token)
- **Products/Orders**: Fetched directly from API (no Redux state)

## 📡 API Integration

- **Base URL**: Configured via `VITE_API_URL` environment variable
- **Centralized URLs**: All API endpoints defined in `src/services/apiUrls.ts`
- **Interceptors**: 
  - Request: Automatically adds Authorization header
  - Response: Handles 401 errors and redirects to login
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🧪 Form Validation

All forms use **Formik** for form state management and **Yup** for schema validation:

- Real-time validation feedback
- Error messages displayed inline
- Toast notifications for success/error states
- Prevents invalid form submissions

## 🎯 Code Quality

### Formatting

Prettier is configured with:
- Single quotes
- Semicolons
- Trailing commas (ES5)
- 80 character line width

Format code:
```bash
npm run format
```

### Linting

ESLint is configured for TypeScript and React:
```bash
npm run lint
```

## 🔒 Security Features

- JWT token-based authentication
- Protected routes with role-based access control
- Automatic token refresh handling
- Secure password handling (never logged)
- XSS protection via React's built-in escaping

## 🚦 Route Protection

- **Public Routes**: Home, Products, Product Details, Cart
- **Authenticated Routes**: Checkout, Profile (requires login)
- **Admin Routes**: All `/admin/*` routes (requires ADMIN role)

## 🐛 Error Handling

- **API Errors**: Displayed via toast notifications
- **Network Errors**: User-friendly error messages
- **Validation Errors**: Inline form validation
- **404 Errors**: Automatic redirect to home page

## 📦 Key Dependencies

- `react` & `react-dom` - UI library
- `react-router-dom` - Routing
- `@reduxjs/toolkit` - State management
- `redux-persist` - State persistence
- `axios` - HTTP client
- `formik` & `yup` - Form handling
- `sonner` - Toast notifications
- `tailwindcss` - Styling
- `lucide-react` - Icons

---

# Architecture & Implementation

# E-Commerce Web Application - Implementation Documentation

This document provides a comprehensive guide to the implementation, architecture, and flow of the E-Commerce Web Application.

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Setup & Configuration](#project-setup--configuration)
3. [State Management](#state-management)
4. [Authentication Flow](#authentication-flow)
5. [Routing & Navigation](#routing--navigation)
6. [API Integration](#api-integration)
7. [Component Architecture](#component-architecture)
8. [Form Handling](#form-handling)
9. [Theme System](#theme-system)
10. [Data Flow Diagrams](#data-flow-diagrams)
11. [Implementation Details](#implementation-details)

---

## 🏗️ Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │   Services   │      │
│  │              │  │              │  │              │      │
│  │ - Admin      │  │ - Layout     │  │ - API Calls  │      │
│  │ - User       │  │ - UI         │  │ - Interceptors│      │
│  │ - Auth       │  │ - Common     │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                  │               │
│         └─────────────────┼──────────────────┘               │
│                           │                                  │
│                  ┌─────────▼─────────┐                       │
│                  │   Redux Store     │                       │
│                  │                   │                       │
│                  │ - Cart (Persist) │                       │
│                  │ - Auth           │                       │
│                  └─────────┬─────────┘                       │
│                            │                                  │
└────────────────────────────┼──────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Backend API    │
                    │  (External)     │
                    └─────────────────┘
```

### Technology Stack Layers

1. **Presentation Layer**: React Components (Pages, UI Components)
2. **State Layer**: Redux Toolkit (Cart, Auth)
3. **Service Layer**: Axios API Service
4. **Routing Layer**: React Router v6
5. **Styling Layer**: Tailwind CSS + shadcn/ui
6. **Form Layer**: Formik + Yup

---

## ⚙️ Project Setup & Configuration

### Environment Configuration

**File**: `.env`
```env
VITE_API_URL=http://localhost:3000/api
```

**TypeScript Declaration**: `src/vite-env.d.ts`
```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}
```

### Vite Configuration

**File**: `vite.config.ts`
- React plugin for JSX transformation
- Path aliases configured (`@/` → `src/`)
- TypeScript support

### Redux Store Configuration

**File**: `src/app/store.ts`

```typescript
{
  reducer: {
    cart: persistedCartReducer,  // Persisted in localStorage
    auth: authReducer             // In-memory state
  }
}
```

**Persistence**: Only cart state is persisted using `redux-persist`

### Tailwind Configuration

**File**: `tailwind.config.js`
- Dark mode: `class` strategy
- Custom theme colors
- Animation support via `tailwindcss-animate`

---

## 🔄 State Management

### Redux Store Structure

#### Cart State (Persisted)

**Location**: `src/features/cart/cartSlice.ts`

```typescript
interface CartState {
  items: CartItem[];      // Array of cart items
  total: number;          // Calculated total
}

interface CartItem {
  product: Product;
  quantity: number;
}
```

**Actions**:
- `addToCart({ product, quantity })` - Add product to cart
- `removeFromCart(productId)` - Remove product from cart
- `updateQuantity({ productId, quantity })` - Update item quantity
- `clearCart()` - Empty the cart

**Persistence**: Cart state is automatically saved to localStorage and restored on page load.

#### Auth State

**Location**: `src/features/auth/authSlice.ts`

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

**Async Thunks**:
- `loginUser({ email, password })` - Login and set user state
- `registerUser({ email, password, name })` - Register new user
- `getCurrentUser()` - Fetch current user from API
- `updateProfile(data)` - Update user profile

**Reducers**:
- `logout` - Clear auth state and remove token
- `setUser` - Manually set user (for initialization)

### State Access Pattern

```typescript
// In components
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const dispatch = useAppDispatch();
const cartItems = useAppSelector((state) => state.cart.items);
const user = useAppSelector((state) => state.auth.user);
```

---

## 🔐 Authentication Flow

### Complete Authentication Flow

```
┌─────────────┐
│  User Login │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ LoginPage Component │
│  - Formik Form      │
│  - Validation       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ dispatch(loginUser) │
│  (Redux Thunk)      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  authAPI.login()    │
│  (API Service)      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  POST /auth/login   │
│  (Backend API)      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Response:          │
│  { user, token }    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Token saved to     │
│  localStorage       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Redux State        │
│  Updated            │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Navigate based on  │
│  user.role          │
│  - ADMIN → /admin   │
│  - USER → /products │
└─────────────────────┘
```

### Token Management

**Storage**: JWT token stored in `localStorage` with key `'token'`

**Injection**: Axios request interceptor automatically adds token to headers:
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Error Handling**: Response interceptor handles 401 errors:
```typescript
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
```

### Protected Routes

**Component**: `src/components/common/ProtectedRoute.tsx`

```typescript
<ProtectedRoute requireAdmin>
  <AdminComponent />
</ProtectedRoute>
```

**Logic**:
1. Check if user is authenticated (`isAuthenticated`)
2. If `requireAdmin` prop is true, check if `user.role === 'ADMIN'`
3. Redirect to login if not authenticated
4. Redirect to home if not admin (when `requireAdmin` is true)

---

## 🧭 Routing & Navigation

### Route Structure

**File**: `src/routes/index.tsx`

```
Public Routes:
├── /                    → HomePage
├── /products            → ProductsPage
├── /products/:id        → ProductDetailPage
├── /cart                → CartPage
├── /auth/login          → LoginPage
├── /auth/register       → RegisterPage
└── /auth/reset-password → ResetPasswordPage

Protected Routes (Authenticated):
├── /checkout            → CheckoutPage
└── /profile             → ProfilePage

Protected Routes (Admin Only):
├── /admin/dashboard     → DashboardPage
├── /admin/orders        → OrdersPage
├── /admin/products     → AdminProductsPage
├── /admin/users         → UsersPage
└── /admin/profile       → AdminProfilePage
```

### Route Constants

**File**: `src/routes/routes.ts`

All frontend routes are centralized in this file for consistency:
```typescript
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  // ... etc
};
```

### Navigation Flow

**After Login**:
- **ADMIN users** → `/admin/dashboard`
- **Regular users** → `/products` (or `/`)

**Layout Components**:
- **Desktop**: `SidebarLayout` with persistent sidebar
- **Mobile**: `DrawerLayout` with hamburger menu

---

## 📡 API Integration

### API Service Architecture

**File**: `src/services/api.ts`

#### Axios Instance Configuration

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

#### Request Interceptor
- Automatically adds `Authorization: Bearer <token>` header
- Token retrieved from `localStorage`

#### Response Interceptor
- Handles 401 errors (unauthorized)
- Automatically logs out user and redirects to login
- Prevents redirect loop if already on login page

### Centralized API URLs

**File**: `src/services/apiUrls.ts`

All API endpoints are defined as constants:

```typescript
export const AUTH_URLS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GET_CURRENT_USER: '/users/me',
  // ...
};

export const PRODUCT_URLS = {
  GET_ALL: '/products',
  GET_BY_ID: (id: string) => `/products/${id}`,
  // ...
};
```

**Usage**:
```typescript
import { PRODUCT_URLS } from '@/services/apiUrls';
const response = await api.get(PRODUCT_URLS.GET_ALL);
```

### API Response Handling

The API service handles different response formats:

```typescript
// Handle different response formats
if (response.data && response.data.data) {
  return response.data.data;
} else if (response.data && response.data.products) {
  return response.data.products;
}
return response.data;
```

### Error Handling Pattern

```typescript
try {
  const data = await productsAPI.getAll();
  // Handle success
} catch (error: any) {
  toast.error(
    error.response?.data?.message || 
    error.message || 
    'Failed to load products'
  );
}
```

---

## 🧩 Component Architecture

### Component Hierarchy

```
App (main.tsx)
└── Provider (Redux)
    └── PersistGate
        └── ThemeProvider
            └── AuthProvider
                └── BrowserRouter
                    └── AppRoutes
                        ├── Header (Global)
                        └── Routes
                            ├── Public Pages
                            ├── Protected Pages
                            └── Admin Pages
```

### Layout Components

#### Header Component
**File**: `src/components/layout/Header.tsx`

**Features**:
- Global navigation
- User menu dropdown
- Theme toggle
- Cart icon with item count
- Mobile responsive

#### SidebarLayout Component
**File**: `src/components/layout/SidebarLayout.tsx`

**Features**:
- Desktop sidebar navigation
- Admin menu items
- Active route highlighting
- Collapsible sections

#### DrawerLayout Component
**File**: `src/components/layout/DrawerLayout.tsx`

**Features**:
- Mobile drawer navigation
- Hamburger menu trigger
- Slide-in animation
- Overlay backdrop

### UI Components (shadcn/ui)

All UI components are located in `src/components/ui/`:
- `Button` - Various variants (default, outline, ghost, etc.)
- `Card` - Container component
- `Input` - Form input with error state
- `Dialog` - Modal dialogs
- `Drawer` - Mobile drawer
- `Table` - Data tables
- `Toast` - Toast notifications (via Sonner)
- And more...

**Usage Pattern**:
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Click me</Button>
  </CardContent>
</Card>
```

---

## 📝 Form Handling

### Formik + Yup Pattern

**Example**: Login Form

```typescript
// 1. Define validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

// 2. Use Formik component
<Formik
  initialValues={{ email: '', password: '' }}
  validationSchema={loginSchema}
  onSubmit={async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setSubmitting(false);
    }
  }}
>
  {({ isSubmitting, errors, touched }) => (
    <Form>
      <Field
        as={Input}
        name="email"
        error={errors.email && touched.email}
      />
      {errors.email && touched.email && (
        <p className="text-sm text-destructive">{errors.email}</p>
      )}
      {/* ... */}
    </Form>
  )}
</Formik>
```

### Form Validation Flow

1. **Schema Definition**: Yup schema defines validation rules
2. **Real-time Validation**: Formik validates on blur and change
3. **Error Display**: Errors shown inline below fields
4. **Submit Prevention**: Form won't submit if validation fails
5. **Toast Notifications**: Success/error messages via Sonner

---

## 🎨 Theme System

### Theme Provider

**File**: `src/theme/theme-provider.tsx`

**Features**:
- Dark/Light mode toggle
- System theme detection
- Persistent theme preference (localStorage)
- Smooth theme transitions

### Usage

```typescript
// In component
import { useTheme } from '@/theme/theme-provider';

const { theme, setTheme } = useTheme();

<Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Theme
</Button>
```

### Theme Classes

Tailwind CSS dark mode classes:
```typescript
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
```

---

## 📊 Data Flow Diagrams

### Product Listing Flow

```
User Action: Visit /products
     │
     ▼
ProductsPage Component
     │
     ▼
useEffect Hook
     │
     ▼
productsAPI.getAll()
     │
     ▼
GET /products (API)
     │
     ▼
Response: Product[]
     │
     ▼
setProducts(state)
     │
     ▼
Render Product Grid
```

### Add to Cart Flow

```
User Action: Click "Add to Cart"
     │
     ▼
handleAddToCart()
     │
     ▼
dispatch(addToCart({ product, quantity }))
     │
     ▼
cartSlice Reducer
     │
     ▼
Update Redux State
     │
     ▼
Persist to localStorage
     │
     ▼
Show Success Toast
     │
     ▼
Update Cart Icon Badge
```

### Order Creation Flow

```
User Action: Submit Checkout Form
     │
     ▼
CheckoutPage onSubmit
     │
     ▼
Validate Shipping Info
     │
     ▼
ordersAPI.create(items, shippingInfo)
     │
     ▼
POST /orders (API)
     │
     ▼
Response: Order
     │
     ▼
dispatch(clearCart())
     │
     ▼
Navigate to Profile/Orders
     │
     ▼
Show Success Toast
```

---

## 🔧 Implementation Details

### Type Safety

**File**: `src/types/index.ts`

All TypeScript interfaces are centralized:

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
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
  isVisible: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  status: 'PENDING' | 'PROCEEDED' | 'CANCELLED';
  totalAmount: number;
  orderItems: OrderItem[];
  createdAt: string;
}
```

### Error Handling Strategy

1. **API Errors**: Caught in try-catch blocks
2. **Display**: Toast notifications via Sonner
3. **User Feedback**: Clear, actionable error messages
4. **Logging**: Console logging for debugging (development)

### Loading States

Components use local state for loading indicators:

```typescript
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await api.getData();
      setData(data);
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);

if (loading) return <div>Loading...</div>;
```

### Responsive Design Strategy

- **Mobile First**: Base styles for mobile
- **Breakpoints**: `sm:`, `md:`, `lg:`, `xl:` Tailwind classes
- **Conditional Rendering**: Different components for mobile/desktop
- **Flexible Layouts**: CSS Grid and Flexbox

### Performance Optimizations

1. **Code Splitting**: React Router lazy loading (if implemented)
2. **Memoization**: React.memo for expensive components
3. **Redux Selectors**: Efficient state selection
4. **Image Optimization**: Lazy loading for product images
5. **Bundle Size**: Tree-shaking via Vite

### Security Considerations

1. **Token Storage**: localStorage (consider httpOnly cookies for production)
2. **XSS Protection**: React's built-in escaping
3. **Input Validation**: Both client-side (Yup) and server-side
4. **HTTPS**: Required in production
5. **CORS**: Backend must allow frontend origin

---

## 🚀 Deployment Checklist

- [ ] Set `VITE_API_URL` environment variable
- [ ] Build production bundle: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Configure backend CORS for production domain
- [ ] Set up HTTPS
- [ ] Test all authentication flows
- [ ] Test all admin features
- [ ] Test responsive design on multiple devices
- [ ] Verify error handling
- [ ] Check console for errors/warnings
- [ ] Optimize images
- [ ] Set up error tracking (e.g., Sentry)

---

## 📖 Additional Resources

- **React Documentation**: https://react.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **React Router**: https://reactrouter.com
- **Formik**: https://formik.org
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
