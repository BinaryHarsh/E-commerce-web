import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { fetchOrders } from '@/features/orders/orderSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, CheckCircle, XCircle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === 'proceeded').length;
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled').length;
  const totalRevenue = orders
    .filter((o) => o.status === 'proceeded')
    .reduce((sum, o) => sum + o.total, 0);

  const totalCost = orders
    .filter((o) => o.status === 'proceeded')
    .reduce((sum, o) => {
      return (
        sum +
        o.items.reduce(
          (itemSum, item) => itemSum + item.product.purchasePrice * item.quantity,
          0
        )
      );
    }, 0);

  const profit = totalRevenue - totalCost;
  const isProfit = profit >= 0;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profit & Loss Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Revenue:</span>
              <span className="font-semibold">${totalRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Cost:</span>
              <span className="font-semibold">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-lg font-semibold">Net {isProfit ? 'Profit' : 'Loss'}:</span>
              <div className="flex items-center gap-2">
                {isProfit ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
                <span
                  className={`text-2xl font-bold ${isProfit ? 'text-green-500' : 'text-red-500'}`}
                >
                  ${Math.abs(profit).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
