import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { ROUTES } from '@/routes/routes';

const adminNavItems = [
  { path: ROUTES.ADMIN.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { path: ROUTES.ADMIN.ORDERS, label: 'Orders', icon: ShoppingBag },
  { path: ROUTES.ADMIN.PRODUCTS, label: 'Products', icon: Package },
  { path: ROUTES.ADMIN.USERS, label: 'Users', icon: Users },
  { path: ROUTES.ADMIN.PROFILE, label: 'Profile', icon: Settings },
];

export function DrawerLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 border-b bg-background p-2">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <nav className="p-4 space-y-2">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? 'default' : 'ghost'}
                    className={cn(
                      'w-full justify-start',
                      isActive && 'bg-primary text-primary-foreground'
                    )}
                    onClick={() => {
                      navigate(item.path);
                      setDrawerOpen(false);
                    }}
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </DrawerContent>
        </Drawer>
      </div>
      <main className="flex-1 overflow-auto pt-12 lg:pt-0">{children}</main>
    </div>
  );
}
