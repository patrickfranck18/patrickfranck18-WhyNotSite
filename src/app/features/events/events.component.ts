import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen dynamic-bg dynamic-text pt-24 md:pt-28 px-4 md:px-10 transition-colors duration-500">
      
      <div class="mb-12 md:mb-24 relative overflow-hidden">
        <h2 class="text-[15vw] md:text-[12rem] font-black italic uppercase leading-none tracking-tighter opacity-5 absolute -left-2 -top-4 select-none pointer-events-none dynamic-text">
          WN CLUB
        </h2>
        <div class="relative z-10">
          <h2 class="text-[12vw] sm:text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter">
            COMMUNITY
          </h2>
          
          <div class="flex gap-6 mt-8 overflow-x-auto no-scrollbar">
            <button (click)="selectedCity.set('all')" 
                    class="text-[10px] uppercase font-black tracking-widest pb-2 transition-all border-b-2"
                    [class.border-white]="selectedCity() === 'all'"
                    [class.opacity-30]="selectedCity() !== 'all'">All</button>
            <button (click)="selectedCity.set('Paris')" 
                    class="text-[10px] uppercase font-black tracking-widest pb-2 transition-all border-b-2"
                    [class.border-white]="selectedCity() === 'Paris'"
                    [class.opacity-30]="selectedCity() !== 'Paris'">Paris</button>
            <button (click)="selectedCity.set('Libreville')" 
                    class="text-[10px] uppercase font-black tracking-widest pb-2 transition-all border-b-2"
                    [class.border-white]="selectedCity() === 'Libreville'"
                    [class.opacity-30]="selectedCity() !== 'Libreville'">Libreville</button>
            <button (click)="selectedCity.set('Dakar')" 
                    class="text-[10px] uppercase font-black tracking-widest pb-2 transition-all border-b-2"
                    [class.border-white]="selectedCity() === 'Dakar'"
                    [class.opacity-30]="selectedCity() !== 'Dakar'">Dakar</button>
          </div>

          <p class="opacity-40 text-[10px] md:text-sm italic font-black mt-6 tracking-[0.4em] uppercase">
            Beyond Performance. Together.
          </p>
        </div>
      </div>

      <div class="border-b dynamic-border">
        @for (event of filteredEvents(); track event.id) {
          <div class="group relative border-t dynamic-border py-10 md:py-16 flex flex-col md:flex-row justify-between items-center transition-all duration-700 px-4 md:px-8 cursor-pointer overflow-hidden">
            
            <div class="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
              <img [src]="event.img" class="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-1000">
            </div>

            <div class="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full">
              <span class="text-3xl md:text-5xl font-black italic tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity">
                {{event.date}}
              </span>
              <h3 class="text-[10vw] sm:text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                {{event.title}}
              </h3>
            </div>
            
            <div class="relative z-10 mt-8 md:mt-0 flex items-center gap-6 md:gap-12 w-full md:w-auto">
              <span class="uppercase font-black tracking-[0.3em] text-[10px] opacity-40 italic">
                {{event.location}}
              </span>
              
              <button (click)="openModal(event); $event.stopPropagation()" 
                      class="dynamic-btn font-black uppercase italic px-6 py-2 text-[10px] tracking-widest border dynamic-border hover:opacity-80 transition-all">
                Réserver
              </button>
            </div>
          </div>
        }
      </div>
    </section>

    @if (isModalOpen()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md" (click)="isModalOpen.set(false)"></div>
        
        <div class="relative dynamic-bg dynamic-text border dynamic-border w-full max-w-lg p-8 md:p-12 shadow-2xl transition-all">
          <button (click)="isModalOpen.set(false)" class="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100">
            Fermer [x]
          </button>

          <div class="mb-10">
            <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Booking Session</span>
            <h3 class="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mt-2">
              {{ selectedEvent()?.title }}
            </h3>
            <p class="text-[10px] font-bold uppercase mt-2 opacity-60 italic">{{ selectedEvent()?.date }} — {{ selectedEvent()?.location }}</p>
          </div>

          <form class="space-y-6">
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-black uppercase tracking-widest">Email de contact</label>
              <input type="email" placeholder="YOUR@EMAIL.COM" 
                     class="w-full bg-transparent border-b-2 dynamic-border py-4 outline-none font-black uppercase italic text-sm placeholder:opacity-20 focus:border-zinc-500 transition-colors">
            </div>

            <button type="button" class="w-full dynamic-btn font-black py-6 uppercase italic tracking-[4px] hover:opacity-90 transition-all active:scale-95">
              Confirmer l'inscription
            </button>
          </form>
        </div>
      </div>
    }
  `
})
export class EventsComponent {
  isModalOpen = signal(false);
  selectedEvent = signal<any>(null);
  
  // SIGNAL POUR LE FILTRE
  selectedCity = signal<string>('all');

  events = signal([
    { id: 1, date: '12.02', title: 'Power Session', location: 'Paris, FR', img: 'assets/theone1.jpg' },
    { id: 2, date: '18.02', title: 'Summit Run', location: 'Lireville, BG', img: 'assets/theone2.jpg' },
    { id: 3, date: '05.03', title: 'Night Training', location: 'Dakar, SN', img: 'assets/theone1.jpg' }
  ]);

  // LOGIQUE DE FILTRAGE
  filteredEvents = computed(() => {
    const city = this.selectedCity();
    if (city === 'all') return this.events();
    return this.events().filter(e => e.location.includes(city));
  });

  openModal(event: any) {
    this.selectedEvent.set(event);
    this.isModalOpen.set(true);
  }

  isDarkMode = signal(true);

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    const theme = this.isDarkMode() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
}