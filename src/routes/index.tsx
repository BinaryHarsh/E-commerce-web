import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { DrawerLayout } from '@/components/layout/DrawerLayout';
import { Header } from '@/components/layout/Header';
import { HomePage } from '@/pages/user/HomePage';
import { ProductsPage } from '@/pages/user/ProductsPage';
import { ProductDetailPage } from '@/pages/user/ProductDetailPage';
import { CartPage } from '@/pages/user/CartPage';
import { CheckoutPage } from '@/pages/user/CheckoutPage';
import { ProfilePage } from '@/pages/user/ProfilePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { OrdersPage } from '@/pages/admin/OrdersPage';
import { ProductsPage as AdminProductsPage } from '@/pages/admin/ProductsPage';
import { UsersPage } from '@/pages/admin/UsersPage';
import { AdminProfilePage } from '@/pages/admin/AdminProfilePage';

function AdminLayout() {
  return (
    <>
      <div className="hidden lg:block">
        <SidebarLayout>
          <Outlet />
        </SidebarLayout>
      </div>
      <div className="lg:hidden">
        <DrawerLayout>
          <Outlet />
        </DrawerLayout>
      </div>
    </>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
