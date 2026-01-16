import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAdmin = signal(false);
  
  loginAsAdmin() {
    this.isAdmin.set(true);
  }

  logout() {
    this.isAdmin.set(false);
  }
}