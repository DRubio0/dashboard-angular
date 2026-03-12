import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoginCredentials } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  credentials: LoginCredentials = { email: '', password: '' };
  readonly error = signal('');
  readonly loading = signal(false);

  onSubmit(): void {
    this.error.set('');
    this.loading.set(true);
    const success = this.authService.login(this.credentials);
    this.loading.set(false);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error.set('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    }
  }
}
