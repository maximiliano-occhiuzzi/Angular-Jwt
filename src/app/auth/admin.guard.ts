import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

// Esto es solo una comodidad de UI (ocultar el link/pantalla a quien no
// es admin). La seguridad real la sigue haciendo el back con hasRole
// ("ADMIN") en /auth/register — este guard nunca reemplaza eso, un
// usuario avispado podría forzar la URL igual, pero el back lo va a
// rebotar con 403 de todas formas.
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  router.navigate(['/listAlumno']);
  return false;
};
