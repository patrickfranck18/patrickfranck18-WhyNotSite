import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ShopComponent],
  template: `
  <section class="relative min-h-[70vh] md:min-h-[100vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
    <!--div class="absolute inset-0 z-0">
      @for (image of images(); track $index) {
        <div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
             [style.backgroundImage]="'url(' + image + ')'"
             [class.opacity-40]="$index === activeIndex()"
             [class.opacity-0]="$index !== activeIndex()">
          <div class="absolute inset-0 bg-black/60"></div>
        </div>
      }
    </div>
    
    <div class="relative z-10 text-white w-full px-4">
      <h2 class="text-[15vw] md:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-8">
        You can <br> <span class="text-transparent" style="-webkit-text-stroke: 1px white;">Do more</span>
      </h2>
    </div-->
    <div class="absolute inset-0 z-0 bg-cover bg-center"
         style="background-image: url('/assets/wnslider.jpg')">
      
    </div>
  </section>

  <app-shop class="z-10" ngSkipHydration></app-shop>
`
})
export class HomeComponent {
  private productService = inject(ProductService);
  private platformId = inject(PLATFORM_ID);
  
  images = this.productService.getHeroImages();
  products = this.productService.getProducts();
  activeIndex = signal(0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.activeIndex.update(val => (val + 1) % this.images().length);
      }, 5000);
    }
  }
}