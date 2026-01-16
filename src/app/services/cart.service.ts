import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  selectedSize: string;
  quantity: number; 
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  items = signal<CartItem[]>([]);
  totalSales = signal(0); 
  salesCount = signal(0); 
  
  
  isCartOpen = signal(false);

  
  total = computed(() => 
    this.items().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  
  count = computed(() => 
    this.items().reduce((acc, item) => acc + item.quantity, 0)
  );

  addToCart(product: any, size: string) {
    this.items.update(currentItems => {
      
      const existingItem = currentItems.find(i => i.id === product.id && i.selectedSize === size);
      
      if (existingItem) {
        
        return currentItems.map(i => 
          i === existingItem ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      return [...currentItems, { ...product, selectedSize: size, quantity: 1 }];
    });
    
    
    this.isCartOpen.set(true);
  }

  
  updateQuantity(id: number, size: string, delta: number) {
    this.items.update(currentItems => currentItems.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQty) }; 
      }
      return item;
    }));
  }

  removeItem(id: number, size: string) {
    this.items.update(items => items.filter(i => !(i.id === id && i.selectedSize === size)));
  }

  confirmOrder() {
    const currentTotal = this.total(); 
    this.totalSales.update(val => val + currentTotal);
    this.salesCount.update(val => val + 1);
    this.items.set([]); 
    alert('Commande confirmée !');
  }
}