import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map((user) => {
      if (user) {
        const requiresAdmin =
          state.url.includes('delete') || state.url.includes('edit');
        if (requiresAdmin && !authService.isAdmin(user)) {
          router.navigate(['/not-authorized']);
          return false;
        }
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};
