import { Component, inject, signal, computed } from '@angular/core'; // Ajout de signal et computed
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="dynamic-bg dynamic-text min-h-screen pt-40 pb-20 px-6 md:px-12 transition-colors duration-500">
  
  <div class="max-w-[1600px] mx-auto mb-16 md:mb-24">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div>
        <h3 class="text-[10px] uppercase tracking-[5px] opacity-30 mb-4 italic">Performance Gear</h3>
        <h2 class="text-6xl md:text-8xl lg:text-[140px] font-black italic uppercase leading-[0.75] tracking-tighter">
          THE GEAR
        </h2>
      </div>
      
      <div class="flex gap-6 overflow-x-auto pb-4 no-scrollbar border-b dynamic-border md:border-none">
        <button (click)="selectedGender.set('all')" 
                class="text-[10px] uppercase font-bold tracking-widest pb-2 transition-all border-white"
                [class.border-b-2]="selectedGender() === 'all'"
                [class.opacity-30]="selectedGender() !== 'all'">All</button>
        
        <button (click)="selectedGender.set('homme')" 
                class="text-[10px] uppercase font-bold tracking-widest pb-2 transition-all border-white"
                [class.border-b-2]="selectedGender() === 'homme'"
                [class.opacity-30]="selectedGender() !== 'homme'">Homme</button>
        
        <button (click)="selectedGender.set('femme')" 
                class="text-[10px] uppercase font-bold tracking-widest pb-2 transition-all border-white"
                [class.border-b-2]="selectedGender() === 'femme'"
                [class.opacity-30]="selectedGender() !== 'femme'">Femme</button>
      </div>
    </div>
  </div>

  <div class="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-20 items-start">
  @for (product of filteredProducts(); track product.id) {
    <div [routerLink]="['/product', product.id]" class="group cursor-pointer flex flex-col w-full max-w-[400px]">
      
      <div class="relative aspect-[3/4] w-full bg-zinc-900 overflow-hidden mb-6">
        <div class="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors z-10"></div>
        
        <img *ngIf="product.imageUrl" [src]="product.imageUrl" 
             class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110">
        
        <div *ngIf="!product.imageUrl" class="absolute inset-0 flex items-center justify-center opacity-5">
          <span class="text-6xl font-black italic">WN</span>
        </div>
        
        <div class="absolute bottom-4 left-4 z-20">
          <span class="text-[8px] font-black bg-white text-black px-2 py-1 uppercase italic tracking-tighter">New</span>
        </div>
      </div>

      <div class="space-y-1">
        <div class="flex justify-between items-baseline">
          <h4 class="text-sm font-black italic uppercase tracking-tight group-hover:tracking-wider transition-all duration-300">
            {{product.name}}
          </h4>
          <span class="text-sm font-bold opacity-80">{{product.price}}€</span>
        </div>
        <div class="flex items-center gap-2">
           <p class="text-[9px] uppercase tracking-[2px] opacity-30 italic">{{product.gender}}</p>
           <span class="w-1 h-1 bg-white/20 rounded-full"></span>
           <p class="text-[9px] uppercase tracking-[2px] opacity-30 italic">{{product.category}}</p>
        </div>
      </div>
    </div>
  }
</div>
</section>
  `,
  styles: [`.no-scrollbar::-webkit-scrollbar { display: none; }`]
})
export class ShopComponent {
  private productService = inject(ProductService);

  // Ton signal de base avec tous les produits
  products = this.productService.getProducts();

  // 1. Signal pour suivre le filtre actuel
  selectedGender = signal<string>('all');

  // 2. Variable calculée qui filtre la liste automatiquement
  filteredProducts = computed(() => {
    const filter = this.selectedGender();
    const allProducts = this.products();
    
    if (filter === 'all') return allProducts;
    
    // On filtre en comparant le genre (en minuscule pour éviter les erreurs)
    return allProducts.filter(p => p.gender?.toLowerCase() === filter.toLowerCase());
  });
}