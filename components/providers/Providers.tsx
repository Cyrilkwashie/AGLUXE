'use client';

import { CatalogProvider } from '@/context/CatalogContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CatalogProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </CatalogProvider>
  );
}
