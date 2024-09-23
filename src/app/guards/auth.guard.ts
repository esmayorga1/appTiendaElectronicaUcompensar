import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> | Promise<boolean> | boolean => {
  const authService = inject(FirebaseService);
  const utilService = inject(UtilsService);

  return authService.isLoggedIn().pipe(map(isLoggedIn => {
    const user = localStorage.getItem('user');

    if (isLoggedIn && user) {
      // Si el usuario está autenticado y existe en localStorage
      return true;
    } else {
      // Si no está autenticado, redirigir a la página de autenticación
      utilService.routerLink('/auth');
      return false;
    }
  }));
};
