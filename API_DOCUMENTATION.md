# API Documentation

This document describes the API endpoints that the frontend expects from the backend server.

## Base URL

The API base URL is configured via the `VITE_API_URL` environment variable (default: `http://localhost:3000/api`)

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST `/auth/login`
Login user
- **Body**: `{ email: string, password: string }`
- **Response**: `{ user: User, token: string }`

#### POST `/auth/register`
Register new user
- **Body**: `{ email: string, password: string, name: string }`
- **Response**: `{ user: User, token: string }`

#### GET `/auth/me`
Get current authenticated user
- **Response**: `User`

#### PUT `/auth/profile`
Update user profile
- **Body**: `{ name?: string, email?: string }`
- **Response**: `User`

#### PUT `/auth/password`
Update user password
- **Body**: `{ oldPassword: string, newPassword: string }`
- **Response**: `void`

#### POST `/auth/reset-password`
Request password reset
- **Body**: `{ email: string }`
- **Response**: `void`

### Products

#### GET `/products`
Get all active products (public)
- **Response**: `Product[]`

#### GET `/products/:id`
Get product by ID (public)
- **Response**: `Product`

#### GET `/admin/products`
Get all products (admin only)
- **Response**: `Product[]`

#### POST `/admin/products`
Create product (admin only)
- **Body**: `{ name: string, description: string, purchasePrice: number, salePrice: number, stock: number, isActive: boolean, images: string[] }`
- **Response**: `Product`

#### PUT `/admin/products/:id`
Update product (admin only)
- **Body**: `Partial<Product>`
- **Response**: `Product`

#### DELETE `/admin/products/:id`
Delete product (admin only)
- **Response**: `void`

### Orders

#### POST `/orders`
Create order (authenticated)
- **Body**: `{ items: CartItem[], shippingInfo: { address: string, city: string, zipCode: string, phone: string, notes?: string } }`
- **Response**: `Order`

#### GET `/orders/:id`
Get order by ID (authenticated)
- **Response**: `Order`

#### GET `/admin/orders`
Get all orders (admin only)
- **Response**: `Order[]`

#### PUT `/admin/orders/:id/proceed`
Proceed order (admin only)
- **Response**: `Order`

#### PUT `/admin/orders/:id/cancel`
Cancel order (admin only)
- **Response**: `Order`

### Users

#### GET `/admin/users`
Get all users (admin only)
- **Response**: `User[]`

#### GET `/admin/users/:id`
Get user by ID (admin only)
- **Response**: `User`

#### POST `/admin/users`
Create user (admin only)
- **Body**: `{ name: string, email: string, role: 'admin' | 'user' }`
- **Response**: `User`

#### PUT `/admin/users/:id`
Update user (admin only)
- **Body**: `Partial<User>`
- **Response**: `User`

#### DELETE `/admin/users/:id`
Delete user (admin only)
- **Response**: `void`

## Data Types

### User
```typescript
{
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}
```

### Product
```typescript
{
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
```

### Order
```typescript
{
  id: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'proceeded' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
```

### CartItem
```typescript
{
  product: Product;
  quantity: number;
}
```

## Error Responses

All errors should follow this format:
```json
{
  "message": "Error message here"
}
```

Status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
