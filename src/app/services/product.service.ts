import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  gender: string;
  category: string;
  imageUrl: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  
  public productsSignal = signal([
  { id: 1, name: 'AERO-DARK TEE', price: 45, gender: 'HOMME', category: 'PERFORMANCE', imageUrl: 'assets/tshirt.jpg', description: 'T-shirt respirant.' },
  { id: 2, name: 'VORTEX SHORTS', price: 55, gender: 'FEMME', category: 'GEAR', imageUrl: 'assets/tshirt5.jpg', description: 'Short léger.' },
  { id: 3, name: 'APEX GEAR', price: 120, gender: 'HOMME', category: 'PERFORMANCE', imageUrl: 'assets/tshirt4.jpg', description: 'Équipement complet.' }
]);

  
  private heroImagesSignal = signal<string[]>([
    'assets/hero-1.jpg',
    'assets/hero-2.jpg',
    'assets/hero-3.jpg'
  ]);

  
  getProducts() { return this.productsSignal; }

  addProduct(newProduct: any) {
    this.productsSignal.update(current => [...current, { 
      ...newProduct, 
      id: current.length + 1,
      imageUrl: '' 
    }]);
  }

  
  getHeroImages() { return this.heroImagesSignal; }

  updateHeroImages(newImages: string[]) {
    this.heroImagesSignal.set(newImages);
  }
  deleteProduct(id: number) {
    this.productsSignal.update(allProducts => 
      allProducts.filter(p => p.id !== id)
    );
  }
}