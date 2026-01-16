import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-black text-white border-t border-white/5 pt-24 pb-12 px-6 md:px-12">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          
          <div class="md:col-span-2">
          
            <h2 class="text-4xl font-black italic uppercase tracking-tighter mb-6">WHY<span class="opacity-40">NOT</span></h2>
            <p class="text-xs font-medium text-white/40 leading-relaxed max-w-sm italic uppercase tracking-widest">
              Plus qu'une marque, une communauté de performance. Nous repoussons les limites de l'équipement sportif pour ceux qui osent demander : "Pourquoi pas moi ?".
            </p>
          </div>

          <div>
            <h4 class="text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-30">Navigation</h4>
            <ul class="space-y-4">
              <li><a routerLink="/" class="text-[10px] font-bold uppercase hover:opacity-50 transition tracking-widest">Accueil</a></li>
              <li><a routerLink="/shop" class="text-[10px] font-bold uppercase hover:opacity-50 transition tracking-widest">Boutique</a></li>
              <li><a routerLink="/events" class="text-[10px] font-bold uppercase hover:opacity-50 transition tracking-widest">Events</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-30">Contact</h4>
            <ul class="space-y-4">
              <li class="text-[10px] font-bold uppercase tracking-widest opacity-60 italic">support&#64;whynot.club</li>
              <li class="text-[10px] font-bold uppercase tracking-widest opacity-60 italic">Paris, FR</li>
              <div class="flex gap-4 pt-4">
                <div class="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer text-[10px] font-black italic">IG</div>
                <div class="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer text-[10px] font-black italic">TW</div>
              </div>
            </ul>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p class="text-[8px] font-bold uppercase tracking-[0.3em] opacity-20">
            &copy; 2026 WHYNOT CLUB. TOUS DROITS RÉSERVÉS.
          </p>
          <div class="flex gap-8">
            <a href="#" class="text-[8px] font-bold uppercase tracking-[0.3em] opacity-20 hover:opacity-100 transition">Mentions Légales</a>
            <a href="#" class="text-[8px] font-bold uppercase tracking-[0.3em] opacity-20 hover:opacity-100 transition">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}