import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
} from 'lucide-react';
import { ROUTES } from '@/routes/routes';

const adminNavItems = [
  { path: ROUTES.ADMIN.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { path: ROUTES.ADMIN.ORDERS, label: 'Orders', icon: ShoppingBag },
  { path: ROUTES.ADMIN.PRODUCTS, label: 'Products', icon: Package },
  { path: ROUTES.ADMIN.USERS, label: 'Users', icon: Users },
  { path: ROUTES.ADMIN.PROFILE, label: 'Profile', icon: Settings },
];

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="hidden lg:block w-64 border-r bg-muted/40">
        <nav className="p-4 space-y-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
