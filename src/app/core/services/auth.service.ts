import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  constructor() {
    this.loadUserFromStorage();
  }

  login(credentials: LoginCredentials): boolean {
    // Mock authentication — replace with a real API call as needed
    if (
      credentials.email === 'admin@example.com' &&
      credentials.password === 'password'
    ) {
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'Admin User',
        role: 'admin',
      };
      this._currentUser.set(user);
      localStorage.setItem('auth_user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('auth_user');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }

  private loadUserFromStorage(): void {
    try {
      const stored = localStorage.getItem('auth_user');
      if (stored) {
        this._currentUser.set(JSON.parse(stored) as User);
      }
    } catch {
      localStorage.removeItem('auth_user');
    }
  }
}
