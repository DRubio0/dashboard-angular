import { Component, signal, computed } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Activo' | 'Inactivo';
  joinDate: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.html',
})
export class Usuarios {
  readonly searchQuery = signal('');
  readonly selectedRole = signal('Todos');

  readonly roles = ['Todos', 'Admin', 'Editor', 'Viewer'];

  readonly users: User[] = [
    { id: 1, name: 'María García', email: 'maria@example.com', role: 'Admin', status: 'Activo', joinDate: '01 Ene 2025' },
    { id: 2, name: 'Carlos López', email: 'carlos@example.com', role: 'Editor', status: 'Activo', joinDate: '15 Feb 2025' },
    { id: 3, name: 'Ana Martínez', email: 'ana@example.com', role: 'Viewer', status: 'Inactivo', joinDate: '03 Mar 2025' },
    { id: 4, name: 'Luis Rodríguez', email: 'luis@example.com', role: 'Editor', status: 'Activo', joinDate: '22 Mar 2025' },
    { id: 5, name: 'Sofía Torres', email: 'sofia@example.com', role: 'Viewer', status: 'Activo', joinDate: '10 Abr 2025' },
    { id: 6, name: 'Pedro Sánchez', email: 'pedro@example.com', role: 'Admin', status: 'Activo', joinDate: '05 May 2025' },
    { id: 7, name: 'Laura Jiménez', email: 'laura@example.com', role: 'Viewer', status: 'Inactivo', joinDate: '18 Jun 2025' },
    { id: 8, name: 'Miguel Fernández', email: 'miguel@example.com', role: 'Editor', status: 'Activo', joinDate: '29 Jul 2025' },
  ];

  readonly filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const role = this.selectedRole();
    return this.users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query);
      const matchesRole = role === 'Todos' || u.role === role;
      return matchesSearch && matchesRole;
    });
  });

  get totalUsers(): number { return this.users.length; }
  get activeUsers(): number { return this.users.filter((u) => u.status === 'Activo').length; }
  get inactiveUsers(): number { return this.users.filter((u) => u.status === 'Inactivo').length; }
  get adminUsers(): number { return this.users.filter((u) => u.role === 'Admin').length; }

  getRoleClasses(role: User['role']): string {
    const map: Record<User['role'], string> = {
      Admin: 'bg-indigo-100 text-indigo-700',
      Editor: 'bg-amber-100 text-amber-700',
      Viewer: 'bg-gray-100 text-gray-600',
    };
    return map[role];
  }

  getStatusClasses(status: User['status']): string {
    return status === 'Activo'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-600';
  }
}
