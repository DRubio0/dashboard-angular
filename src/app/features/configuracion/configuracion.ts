import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-configuracion',
  imports: [FormsModule],
  templateUrl: './configuracion.html',
})
export class Configuracion {
  private readonly authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser;

  readonly activeTab = signal<'perfil' | 'notificaciones' | 'seguridad'>('perfil');

  readonly profileName = signal(this.currentUser()?.name ?? '');
  readonly profileEmail = signal(this.currentUser()?.email ?? '');
  readonly profileSaved = signal(false);

  readonly passwordSaved = signal(false);
  readonly currentPassword = signal('');
  readonly newPassword = signal('');
  readonly confirmPassword = signal('');
  readonly passwordError = signal('');

  readonly notifications: NotificationSetting[] = [
    { id: 'email_activity', label: 'Actividad por email', description: 'Recibe un resumen diario de la actividad de tu cuenta.', enabled: true },
    { id: 'new_users', label: 'Nuevos usuarios', description: 'Notificación cuando un usuario nuevo se registra.', enabled: true },
    { id: 'reports_ready', label: 'Reportes listos', description: 'Aviso cuando un reporte ha sido generado.', enabled: false },
    { id: 'system_alerts', label: 'Alertas del sistema', description: 'Avisos críticos sobre el estado del sistema.', enabled: true },
    { id: 'marketing', label: 'Comunicaciones de marketing', description: 'Novedades, actualizaciones y ofertas.', enabled: false },
  ];

  saveProfile(): void {
    this.profileSaved.set(true);
    setTimeout(() => this.profileSaved.set(false), 3000);
  }

  savePassword(): void {
    this.passwordError.set('');
    if (!this.currentPassword()) {
      this.passwordError.set('Debes ingresar tu contraseña actual.');
      return;
    }
    if (this.newPassword().length < 8) {
      this.passwordError.set('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (this.newPassword() !== this.confirmPassword()) {
      this.passwordError.set('Las contraseñas no coinciden.');
      return;
    }
    this.passwordSaved.set(true);
    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
    setTimeout(() => this.passwordSaved.set(false), 3000);
  }

  toggleNotification(setting: NotificationSetting): void {
    setting.enabled = !setting.enabled;
  }
}
