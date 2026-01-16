import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-black text-white p-6 md:p-20 pt-32 md:pt-28">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h1 class="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
  DASHBOARD
</h1>
          <p class="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mt-4 italic">
            Management & Performance Control
          </p>
        </div>
        
        <div class="flex gap-12">
          <div class="bg-zinc-900/50 p-8 border border-white/5">
  <p class="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-2">Ventes Totales</p>
  <span class="text-4xl font-black italic">{{ cartService.salesCount() }}</span>
</div>

<div class="bg-zinc-900/50 p-8 border border-white/5">
  <p class="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-2">Chiffre d'Affaires</p>
  <span class="text-4xl font-black italic text-green-500">{{ cartService.totalSales() }}€</span>
</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 space-y-10">
          <div class="border border-white/10 p-8 md:p-12 bg-zinc-900/30">
           <h2 class="text-2xl md:text-4xl font-black italic uppercase opacity-60">
  AJOUTER AU CATALOGUE
</h2>
            
            <form class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase opacity-40">Nom du produit</label>
                <input type="text" [value]="newName()" (input)="newName.set($any($event.target).value)" placeholder="EX: VORTEX SHORTS" 
                       class="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition-colors uppercase font-bold italic">
              </div>
              
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase opacity-40">Prix (€)</label>
                <input [value]="newPrice()" (input)="newPrice.set($any($event.target).value)" 
       placeholder="00.00" class="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-white transition-colors uppercase font-bold italic">
              </div>

              <div class="md:col-span-2 space-y-2">
                <label class="text-[10px] font-black uppercase opacity-40">Description</label>
                <textarea 
  [value]="newDesc()" 
  (input)="newDesc.set($any($event.target).value)" 
  placeholder="DETAILS TECHNIQUES..." 
  class="bg-transparent border-b border-white/20 w-full py-4 outline-none focus:border-white transition-all resize-none h-32 font-black uppercase italic"
></textarea>
<div class="flex gap-8 mb-12">
  <div class="flex-1">
    <label class="block text-[10px] opacity-50 font-black uppercase tracking-widest mb-2">Genre</label>
    <select 
      [value]="newGender()" 
      (change)="newGender.set($any($event.target).value)"
      class="w-full bg-black border-b border-white/20 py-3 outline-none focus:border-white transition-all uppercase italic font-bold appearance-none cursor-pointer">
      <option value="HOMME" class="bg-zinc-900">HOMME</option>
      <option value="FEMME" class="bg-zinc-900">FEMME</option>
      <option value="UNISEX" class="bg-zinc-900">UNISEX</option>
    </select>
  </div>

  <div class="flex-1">
    <label class="block text-[10px] opacity-50 font-black uppercase tracking-widest mb-2">Catégorie</label>
    <select 
      [value]="newCategory()" 
      (change)="newCategory.set($any($event.target).value)"
      class="w-full bg-black border-b border-white/20 py-3 outline-none focus:border-white transition-all uppercase italic font-bold appearance-none cursor-pointer">
      <option value="PERFORMANCE" class="bg-zinc-900">PERFORMANCE</option>
      <option value="GEAR" class="bg-zinc-900">GEAR</option>
      <option value="LIFESTYLE" class="bg-zinc-900">LIFESTYLE</option>
    </select>
  </div>
</div>
              </div>
              

              <button 
  (click)="handlePublish()" 
  class="w-full bg-white text-black py-6 font-black uppercase italic tracking-[4px] hover:bg-zinc-200 transition-all active:scale-95"
>
                Publier le produit
              </button>
            </form>
          </div>
        </div>

        <div class="space-y-6">
          <h2 class="text-2xl md:text-4xl text-[10px] font-black uppercase tracking-[4px] opacity-40 italic">Flux d'activité</h2>
          <div class="border border-white/10 divide-y divide-white/5">
            @for (item of cartService.items(); track item.id) {
              <div class="p-4 flex justify-between items-center bg-white/5">
                <span class="text-[10px] font-black uppercase">{{ item.name }}</span>
                <span class="text-[10px] font-bold opacity-40 italic">Ajouté au panier</span>
              </div>
            } @empty {
              <div class="p-10 text-center opacity-20 italic text-xs uppercase tracking-widest">
                Aucune activité récente
              </div>
            }
          </div>
        </div>
      </div>
    </div>

    <div class="mt-20">
  <h2 class="text-2xl font-black italic uppercase mb-8 tracking-tighter">
    Catalogue Actuel ({{ productService.productsSignal().length }} produits)
  </h2>

  <div class="grid gap-4">
    @for (product of productService.productsSignal(); track product.id) {
      <div class="flex items-center justify-between p-6 bg-zinc-900/30 border border-white/5">
        
        <div class="flex flex-col">
          <span class="text-[10px] text-zinc-500 font-mono">ID: {{ product.id }}</span>
          <h4 class="font-bold uppercase italic">{{ product.name }}</h4>
          <p class="text-green-500 font-mono">{{ product.price }}€</p>
        </div>
        <button 
          (click)="productService.deleteProduct(product.id)"
          class="px-4 py-2 border border-red-500/50 text-red-500 text-xs uppercase font-black hover:bg-red-500 hover:text-white transition-all">
          Supprimer
        </button>

      </div>
    }
  </div>
</div>
  `,
})

export class AdminComponent {
  
  public productService = inject(ProductService);
  public cartService = inject(CartService);

  
  newName = signal('');
  newPrice = signal(0);
  newDesc = signal('');
  newGender = signal('UNISEX'); 
  newCategory = signal('PERFORMANCE');

  
  handlePublish() {
    if (this.newName() && this.newPrice() > 0) {
      this.productService.addProduct({
        name: this.newName(),
        price: this.newPrice(),
        description: this.newDesc(),
        gender: 'UNISEX', 
        category: 'NEW ARRIVAL'
      });

      
      this.newName.set('');
      this.newPrice.set(0);
      this.newDesc.set('');
      
      alert('Produit ajouté avec succès !');
    } else {
      alert('Veuillez remplir au moins le nom et le prix.');
    }
  }
}