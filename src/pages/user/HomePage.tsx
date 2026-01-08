import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Package, Shield, Truck } from 'lucide-react';

export function HomePage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to E-Commerce Store</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover amazing products at great prices
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/products">
            <Button size="lg">Shop Now</Button>
          </Link>
          <Link to="/auth/register">
            <Button size="lg" variant="outline">
              Create Account
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
        <Card>
          <CardHeader>
            <ShoppingBag className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Wide Selection</CardTitle>
            <CardDescription>Browse thousands of products</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Truck className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Fast Delivery</CardTitle>
            <CardDescription>Quick and reliable shipping</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Secure Payment</CardTitle>
            <CardDescription>Safe and encrypted transactions</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Package className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Quality Guaranteed</CardTitle>
            <CardDescription>Only the best products</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
