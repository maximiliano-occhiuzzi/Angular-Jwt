import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'escuela';

  loggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loggedIn$ = this.authService.isLoggedIn$();
  }

  get username(): string | null {
    return this.authService.getUsername();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  cerrandoSesion = false;

  salir(): void {
    this.cerrandoSesion = true;

    // El logout en sí (authService.logout()) ya dispara el POST a
    // /auth/logout para revocar el refresh token en el servidor — acá
    // solo demoramos la navegación visual, para que la pantalla de
    // "Cerrando sesión..." se note en vez de ser un salto instantáneo.
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']).then(() => {
        this.cerrandoSesion = false;
      });
    }, 3000);
  }
}
