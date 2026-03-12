import { Component, signal } from '@angular/core';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.html',
})
export class Configuracion {
  readonly profileName = signal('Admin User');
  readonly profileEmail = signal('admin@example.com');
  readonly profileBio = signal('Administrador del sistema.');
  readonly saveSuccess = signal(false);

  readonly notifications = signal<NotificationSetting[]>([
    { id: 'email_activity', label: 'Actividad por email', description: 'Recibe un correo cuando haya nueva actividad.', enabled: true },
    { id: 'push_alerts', label: 'Alertas del sistema', description: 'Notificaciones de alertas críticas del sistema.', enabled: true },
    { id: 'weekly_report', label: 'Reporte semanal', description: 'Resumen semanal de actividad enviado al email.', enabled: false },
    { id: 'new_users', label: 'Nuevos usuarios', description: 'Notificar cuando un nuevo usuario se registre.', enabled: false },
  ]);

  toggleNotification(id: string): void {
    this.notifications.update((list) =>
      list.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  }

  saveProfile(): void {
    this.saveSuccess.set(true);
    setTimeout(() => this.saveSuccess.set(false), 3000);
  }
}
