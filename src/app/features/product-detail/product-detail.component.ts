import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-black text-white pt-10 pb-12 px-6 md:px-12 flex flex-col md:pt-28">
      
      <div class="mb-10">
        <a routerLink="/shop" 
           class="inline-flex items-center gap-2 group transition-opacity opacity-40 hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-x-1">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span class="text-[10px] font-black uppercase tracking-[3px] italic">Retour</span>
        </a>  
      </div>

      @if (product()) {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-[1400px] mx-auto w-full">
          
          <div class="w-full aspect-[3/4] bg-zinc-900 overflow-hidden border border-white/5">
            <img *ngIf="product()?.imageUrl" [src]="product()?.imageUrl" 
                 class="w-full h-full object-cover" [alt]="product()?.name">
            <div *ngIf="!product()?.imageUrl" class="w-full h-full flex items-center justify-center opacity-10 italic text-6xl">
              WN
            </div>
          </div>

          <div class="flex flex-col justify-center space-y-8">
            <div>
              <nav class="flex gap-2 text-[10px] uppercase tracking-widest opacity-30 mb-6 italic">
                <a routerLink="/shop" class="hover:opacity-100 transition-opacity">Boutique</a> / 
                <span>{{product()?.category}}</span>
              </nav>
              
              <h1 class="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter mb-4">
                {{product()?.name}}
              </h1>
              <p class="text-2xl font-black italic opacity-80">{{product()?.price}}€</p>
            </div>

            <p class="text-sm opacity-60 leading-relaxed max-w-md italic">
              {{product()?.description}}
            </p>

            <div class="space-y-4">
              <p class="text-[10px] uppercase font-black tracking-[3px]">Choisir la taille</p>
              <div class="flex flex-wrap gap-3">
                @for (size of ['S', 'M', 'L', 'XL']; track size) {
                  <button (click)="selectedSize.set(size)"
                    [class]="selectedSize() === size ? 'bg-white text-black' : 'border-white/20 text-white'"
                    class="border px-6 py-3 text-xs font-black transition-all hover:border-white">
                    {{size}}
                  </button>
                }
              </div>
            </div>

            <button (click)="cartService.addToCart(product()!, selectedSize())"
                    class="w-full lg:w-max bg-white text-black font-black uppercase italic px-16 py-5 tracking-[3px] hover:bg-zinc-200 transition-all active:scale-95">
              Ajouter au panier +
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class ProductDetailComponent {
  
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  public cartService = inject(CartService); 

  
  product = signal<Product | undefined>(undefined);
  selectedSize = signal<string>('M');

  constructor() {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    
    const productsList = this.productService.getProducts()();
    const foundProduct = productsList.find(p => p.id === id);
    
    this.product.set(foundProduct);
  }
}