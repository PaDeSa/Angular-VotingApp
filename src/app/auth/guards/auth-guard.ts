import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../auth';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

 if(!auth.isAuthenticated()){
    Swal.fire({
      title: 'Session expirée',
      text: 'Veuillez vous reconnecter',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    router.navigate(['/login']);
    return false;
  }
  return true;
};
