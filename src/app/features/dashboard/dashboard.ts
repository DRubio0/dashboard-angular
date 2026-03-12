import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface Stat {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
  bgClass: string;
  textClass: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  date: string;
  status: 'Completado' | 'Pendiente' | 'Cancelado';
}

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
})
export class Dashboard {
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

  readonly stats: Stat[] = [
    {
      label: 'Usuarios totales',
      value: '1,284',
      trend: '+12%',
      positive: true,
      bgClass: 'bg-indigo-100',
      textClass: 'text-indigo-600',
    },
    {
      label: 'Ventas del mes',
      value: '$34,200',
      trend: '+8%',
      positive: true,
      bgClass: 'bg-green-100',
      textClass: 'text-green-600',
    },
    {
      label: 'Pedidos activos',
      value: '320',
      trend: '-3%',
      positive: false,
      bgClass: 'bg-orange-100',
      textClass: 'text-orange-600',
    },
    {
      label: 'Tickets abiertos',
      value: '18',
      trend: '+5%',
      positive: true,
      bgClass: 'bg-purple-100',
      textClass: 'text-purple-600',
    },
  ];

  readonly recentActivity: Activity[] = [
    { id: 1, user: 'María García', action: 'Creó un nuevo pedido', date: '11 Mar 2026', status: 'Completado' },
    { id: 2, user: 'Carlos López', action: 'Actualizó su perfil', date: '11 Mar 2026', status: 'Completado' },
    { id: 3, user: 'Ana Martínez', action: 'Envió un ticket de soporte', date: '10 Mar 2026', status: 'Pendiente' },
    { id: 4, user: 'Luis Rodríguez', action: 'Realizó un pago', date: '10 Mar 2026', status: 'Completado' },
    { id: 5, user: 'Sofía Torres', action: 'Solicitud de reembolso', date: '09 Mar 2026', status: 'Cancelado' },
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

  isDashboardRoute(): boolean {
    return this.router.url === '/dashboard';
  }

  getCurrentModuleTitle(): string {
    const current = this.navItems.find((item) => this.isActive(item.route));
    return current?.label ?? 'Dashboard';
  }

  logout(): void {
    this.authService.logout();
  }

  getStatusClasses(status: Activity['status']): string {
    const map: Record<Activity['status'], string> = {
      Completado: 'bg-green-100 text-green-700',
      Pendiente: 'bg-yellow-100 text-yellow-700',
      Cancelado: 'bg-red-100 text-red-600',
    };
    return map[status];
  }
}
