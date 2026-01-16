import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="cart.isCartOpen()" 
         (click)="cart.isCartOpen.set(false)" 
         class="fixed inset-0 bg-black/80 z-[2000] backdrop-blur-sm transition-opacity">
    </div>

    <div [class.translate-x-0]="cart.isCartOpen()" 
         [class.translate-x-full]="!cart.isCartOpen()"
         class="fixed top-0 right-0 h-full w-full md:w-[500px] bg-black z-[2001] transition-transform duration-500 border-l border-white/10 p-8 flex flex-col shadow-2xl">
      
      <div class="flex justify-between items-start mb-12">
        <div class="flex flex-col">
          <h2 class="text-6xl font-black italic uppercase tracking-tighter text-white leading-[0.8]">Mon</h2>
          <h2 class="text-6xl font-black italic uppercase tracking-tighter text-white leading-[0.8]">Panier</h2>
        </div>
        
        <button (click)="cart.isCartOpen.set(false)" class="group p-2 mt-2">
          <div class="relative w-8 h-8">
            <span class="absolute block w-full h-1 bg-white rotate-45 top-4 transition-transform group-hover:scale-110"></span>
            <span class="absolute block w-full h-1 bg-white -rotate-45 top-4 transition-transform group-hover:scale-110"></span>
          </div>
        </button>
      </div>

      <div class="flex-grow overflow-y-auto space-y-8 pr-2 custom-scrollbar">
        @for (item of cart.items(); track item.id + item.selectedSize) {
          <div class="flex gap-6 border-b border-white/5 pb-8 group">
            <div class="w-24 h-32 bg-zinc-900 overflow-hidden border border-white/5">
              <img [src]="item.imageUrl" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
            </div>
            
            <div class="flex-grow flex flex-col justify-between py-1">
              <div class="space-y-1">
                <h4 class="text-lg font-black italic uppercase text-white tracking-tight">{{item.name}}</h4>
                <p class="text-[10px] opacity-40 uppercase font-bold tracking-widest">Taille: {{item.selectedSize}}</p>
              </div>

            <div class="flex items-center gap-3 border border-white/10 w-max px-2 py-1">
              <button (click)="cart.updateQuantity(item.id, item.selectedSize, -1)" class="hover:text-red-500">-</button>
                <span class="text-[10px] font-black w-4 text-center">{{ item.quantity }}</span>
              <button (click)="cart.updateQuantity(item.id, item.selectedSize, 1)" class="hover:text-green-500">+</button>
            </div>
              
              <div class="flex justify-between items-end">
                <span class="text-xl font-black italic text-white">{{item.price}}€</span>
                <button (click)="cart.removeItem(item.id, item.selectedSize)" 
                        class="text-[9px] text-white/30 hover:text-red-500 uppercase font-black tracking-widest transition-colors">
                  Supprimer —
                </button>
              </div>
            </div>
          </div>
        } @empty {
          <div class="h-full flex flex-col items-center justify-center space-y-4 opacity-20 italic">
            <p class="uppercase tracking-[5px] text-xs">Ton panier est vide</p>
            <button (click)="cart.isCartOpen.set(false)" class="text-[10px] uppercase border-b border-white">Continuer mes achats</button>
          </div>
        }
      </div>

      <div *ngIf="cart.count() > 0" class="pt-8 border-t border-white/10 space-y-8">
        <div class="flex justify-between items-baseline">
          <span class="text-xs uppercase font-black opacity-40 tracking-[3px]">Total</span>
          <span class="text-4xl font-black italic text-white">{{cart.total()}}€</span>
        </div>

        <button (click)="cart.confirmOrder()" class="w-full bg-white text-black font-black uppercase italic py-6 text-sm tracking-[4px] hover:bg-zinc-200 transition-all active:scale-95 shadow-lg">
          Commander ({{ cart.total() }}€)
        </button>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 2px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
  `]
})
export class CartComponent {
  public cart = inject(CartService);
}