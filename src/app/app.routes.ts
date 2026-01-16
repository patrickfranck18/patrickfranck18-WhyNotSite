import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { EventsComponent } from './features/events/events.component';
import { ShopComponent } from './features/shop/shop.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'events', component: EventsComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'product/:id', loadComponent: () => import('./features/product-detail/product-detail.component').then(m => m.ProductDetailComponent) }
];
