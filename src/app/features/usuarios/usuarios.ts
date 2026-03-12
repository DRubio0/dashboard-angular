import { Component, signal, computed } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Activo' | 'Inactivo' | 'Pendiente';
  joinDate: string;
  avatarColor: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.html',
})
export class Usuarios {
  readonly searchText = signal('');
  readonly selectedRole = signal('');
  readonly selectedStatus = signal('');

  readonly users: User[] = [
    { id: 1, name: 'María García', email: 'maria.garcia@example.com', role: 'Admin', status: 'Activo', joinDate: '01 Ene 2025', avatarColor: 'bg-indigo-500' },
    { id: 2, name: 'Carlos López', email: 'carlos.lopez@example.com', role: 'Editor', status: 'Activo', joinDate: '15 Feb 2025', avatarColor: 'bg-green-500' },
    { id: 3, name: 'Ana Martínez', email: 'ana.martinez@example.com', role: 'Viewer', status: 'Pendiente', joinDate: '20 Feb 2025', avatarColor: 'bg-pink-500' },
    { id: 4, name: 'Luis Rodríguez', email: 'luis.rodriguez@example.com', role: 'Editor', status: 'Activo', joinDate: '05 Mar 2025', avatarColor: 'bg-orange-500' },
    { id: 5, name: 'Sofía Torres', email: 'sofia.torres@example.com', role: 'Viewer', status: 'Inactivo', joinDate: '10 Mar 2025', avatarColor: 'bg-purple-500' },
    { id: 6, name: 'Jorge Ramírez', email: 'jorge.ramirez@example.com', role: 'Editor', status: 'Activo', joinDate: '18 Mar 2025', avatarColor: 'bg-teal-500' },
    { id: 7, name: 'Laura Sánchez', email: 'laura.sanchez@example.com', role: 'Viewer', status: 'Activo', joinDate: '22 Mar 2025', avatarColor: 'bg-cyan-500' },
    { id: 8, name: 'Pedro Herrera', email: 'pedro.herrera@example.com', role: 'Viewer', status: 'Inactivo', joinDate: '01 Abr 2025', avatarColor: 'bg-red-500' },
  ];

  readonly filteredUsers = computed(() => {
    const search = this.searchText().toLowerCase();
    const role = this.selectedRole();
    const status = this.selectedStatus();

    return this.users.filter((user) => {
      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);
      const matchesRole = !role || user.role === role;
      const matchesStatus = !status || user.status === status;
      return matchesSearch && matchesRole && matchesStatus;
    });
  });

  getStatusClasses(status: User['status']): string {
    const map: Record<User['status'], string> = {
      Activo: 'bg-green-100 text-green-700',
      Inactivo: 'bg-red-100 text-red-600',
      Pendiente: 'bg-yellow-100 text-yellow-700',
    };
    return map[status];
  }

  getRoleClasses(role: User['role']): string {
    const map: Record<User['role'], string> = {
      Admin: 'bg-indigo-100 text-indigo-700',
      Editor: 'bg-blue-100 text-blue-700',
      Viewer: 'bg-gray-100 text-gray-600',
    };
    return map[role];
  }
}
