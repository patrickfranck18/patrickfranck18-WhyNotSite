import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CartComponent } from '../../../features/cart/cart.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CartComponent], 
  template: `
    <nav [class.dynamic-bg]="isScrolled() || isMenuOpen()" 
         [class.py-4]="isScrolled()" 
         [class.py-6]="!isScrolled()"
         class="fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-6 md:px-12 flex justify-between items-center border-b border-white/5">
      
      <div class="flex items-center gap-2 md:gap-4 cursor-pointer group" routerLink="/">
         <!--img src="/assets/logo.jpg" class="h-8 md:h-10 w-auto invert brightness-200 transition-transform group-hover:scale-110" alt="WhyNot Logo"-->
         <a class="text-xl md:text-2xl font-black italic tracking-tighter dynamic-text uppercase no-underline">
           WHY<span class="opacity-40">NOT</span>
         </a>
      </div>

      <div class="hidden md:flex gap-10">
        <a routerLink="/" class="nav-link">Accueil</a>
        <a routerLink="/shop" class="nav-link">Boutique</a>
        <a routerLink="/events" class="nav-link">Event</a>
        <!-- @if (auth.isAdmin()) {-->
    <a routerLink="/admin" class="nav-link text-green-500 border-b border-green-500/20">Admin</a>
  <!--}-->
      </div>

      <div class="flex gap-5 items-center dynamic-text">
        <button (click)="cartService.isCartOpen.set(true)" class="relative p-2 opacity-80 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>

          @if (cartService.count() > 0) {
            <span class="absolute top-0 right-0 bg-white text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {{ cartService.count() }}
            </span>
          }
        </button>
        <!--button (click)="toggleTheme()" 
          class="text-[10px] font-black uppercase italic tracking-widest border-b dynamic-border pb-1">
    {{ isDarkMode() ? 'LIGHT' : 'DARK' }}
  </button-->
        
        <button (click)="toggleMenu()" class="md:hidden opacity-80 hover:opacity-100">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </nav>

    <app-cart></app-cart>

    <div *ngIf="isMenuOpen()" (click)="toggleMenu()" class="fixed inset-0 bg-black/60 z-[1001] md:hidden"></div>
    <div [class.translate-x-0]="isMenuOpen()" [class.translate-x-full]="!isMenuOpen()"
         class="fixed top-0 right-0 h-full w-[250px] bg-black z-[1002] transition-transform duration-300 border-l border-white/10 md:hidden p-8 flex flex-col gap-6">
      <button (click)="toggleMenu()" class="self-end dynamic-text opacity-60 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
      </button>
      <a routerLink="/" (click)="toggleMenu()" class="nav-link text-lg">Accueil</a>
      <a routerLink="/shop" (click)="toggleMenu()" class="nav-link text-lg">Boutique</a>
      <a routerLink="/events" (click)="toggleMenu()" class="nav-link text-lg">Event</a>
      @if (auth.isAdmin()) {
    <a routerLink="/admin" (click)="toggleMenu()" class="nav-link text-lg text-green-500">Dashboard</a>
  }
    </div>
  `,
  styles: [`
  .nav-link {
    color: var(--text-color); /* ICI : Le texte devient noir en mode clair */
    opacity: 0.6;
    transition: all 0.3s ease;
  }
  .nav-link:hover { opacity: 1; }
`]
})
export class HeaderComponent {
  cartService = inject(CartService);
  auth = inject(AuthService);
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
 isDarkMode = signal(true); 

  toggleTheme() {
    this.isDarkMode.update((v: boolean) => !v); // On précise le type (boolean) pour enlever l'erreur sur 'v'
    const theme = this.isDarkMode() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
}