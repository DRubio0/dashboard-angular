import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './app-layout.html',
})
export class AppLayout {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly currentUser = this.authService.currentUser;
  readonly sidebarOpen = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'home', route: '/dashboard' },
    { label: 'Usuarios', icon: 'users', route: '/usuarios' },
    { label: 'Reportes', icon: 'chart', route: '/reportes' },
    { label: 'Configuración', icon: 'settings', route: '/configuracion' },
  ];

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.sidebarOpen.set(false);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  getCurrentModuleTitle(): string {
    const current = this.navItems.find((item) => this.isActive(item.route));
    return current?.label ?? 'Dashboard';
  }

  logout(): void {
    this.authService.logout();
  }
}
