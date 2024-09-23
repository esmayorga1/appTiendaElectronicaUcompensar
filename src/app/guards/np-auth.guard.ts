import { CanActivateFn } from '@angular/router';

export const npAuthGuard: CanActivateFn = (route, state) => {
  return true;
};


