# E-Commerce Web Application

A complete full-stack e-commerce web application built with React, Vite, TypeScript, and modern frontend technologies.

## Tech Stack

- **React 18** + **Vite** - Fast development and build tooling
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Redux Toolkit** - State management for cart and auth
- **React Router v6** - Client-side routing
- **Formik + Yup** - Form handling and validation
- **Sonner** - Toast notifications
- **Axios** - HTTP client for API calls
- **Prettier** - Code formatting

## Features

### Admin Features
- **Dashboard**: View orders, revenue, profit & loss summary
- **Orders Management**: View, proceed, and cancel orders with automatic stock management
- **Products Management**: Create, edit, delete products with image uploads
- **Users Management**: Manage user accounts
- **Profile Management**: Update admin profile and password

### End User Features
- **Authentication**: Register, login, logout, profile management
- **Product Browsing**: View products with out-of-stock indicators
- **Shopping Cart**: Add, update, remove items (persisted in localStorage)
- **Checkout**: Place orders with shipping information

## Project Structure

```
src/
 ├─ app/
 │   ├─ store.ts          # Redux store configuration
 │   └─ hooks.ts          # Typed Redux hooks
 ├─ components/
 │   ├─ layout/           # Layout components (Header, Sidebar, Drawer)
 │   ├─ ui/               # shadcn/ui components
 │   └─ common/           # Shared components
 ├─ features/
 │   ├─ auth/             # Authentication slice
 │   ├─ cart/             # Cart slice
 │   ├─ products/         # Products slice and forms
 │   ├─ orders/           # Orders slice
 │   └─ users/            # User management forms
 ├─ pages/
 │   ├─ admin/            # Admin pages
 │   ├─ auth/             # Authentication pages
 │   └─ user/             # User-facing pages
 ├─ services/             # API service layer
 ├─ routes/               # Route configuration
 ├─ theme/                # Theme provider
 └─ utils/                # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API server running (see API_DOCUMENTATION.md for endpoint details)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your API URL:
```
VITE_API_URL=http://localhost:3000/api
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Backend API

This frontend requires a backend API server. See `API_DOCUMENTATION.md` for complete API endpoint specifications.

The API base URL is configured via the `VITE_API_URL` environment variable in `.env`.

## Features in Detail

### Dark Mode
- Toggle between light and dark themes
- Theme preference persisted in localStorage
- System theme detection

### Responsive Design
- Desktop: Sidebar navigation
- Mobile: Hamburger menu with drawer
- Fully responsive across all screen sizes

### State Management
- Redux Toolkit for cart state only (persisted in localStorage)
- React Context API for authentication state
- Direct API calls for all data fetching (products, orders, users)

### Form Validation
- All forms use Formik + Yup
- Real-time validation feedback
- Error messages via Sonner toasts

### API Layer
- Real API calls using Axios
- Environment variable configuration for API URL
- Automatic token injection in requests
- Error handling and interceptors configured
- See `API_DOCUMENTATION.md` for backend API requirements

## Code Formatting

Prettier is configured with:
- Single quotes
- Semicolons
- Trailing commas (ES5)
- 80 character line width

Format code:
```bash
npm run format
```

## License

MIT
