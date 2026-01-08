import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  fetchProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/features/products/productSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProductForm } from '@/features/products/ProductForm';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { Product } from '@/types';

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProductsAdmin());
  }, [dispatch]);

  const handleCreate = async (data: any) => {
    try {
      await dispatch(createProduct(data)).unwrap();
      toast.success('Product created successfully');
      setIsCreateDialogOpen(false);
      dispatch(fetchProductsAdmin());
    } catch (error: any) {
      toast.error(error.message || 'Failed to create product');
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    try {
      await dispatch(updateProduct({ id, data })).unwrap();
      toast.success('Product updated successfully');
      setEditingProduct(null);
      dispatch(fetchProductsAdmin());
    } catch (error: any) {
      toast.error(error.message || 'Failed to update product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success('Product deleted successfully');
      dispatch(fetchProductsAdmin());
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  const handleToggleActive = async (product: Product) => {
    await handleUpdate(product.id, { isActive: !product.isActive });
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleCreate} onCancel={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No products found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Purchase Price</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead>Margin</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.purchasePrice.toFixed(2)}</TableCell>
                    <TableCell>${product.salePrice.toFixed(2)}</TableCell>
                    <TableCell>${product.margin.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={product.isActive}
                          onCheckedChange={() => handleToggleActive(product)}
                        />
                        <Label>{product.isActive ? 'Active' : 'Inactive'}</Label>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingProduct(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSubmit={(data) => handleUpdate(editingProduct.id, data)}
              onCancel={() => setEditingProduct(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
