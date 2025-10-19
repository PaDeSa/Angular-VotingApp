import { HttpInterceptorFn } from "@angular/common/http";
import { Auth } from "../auth";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";



export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(Auth);
    const route = inject(Router)

    let authReq = req;
    const token = authService.getToken();


    if (token != null) {
      const accessTokenExpired = authService.tokenExpired(token);
      console.log("token expired "+accessTokenExpired)
      if(accessTokenExpired){
        Swal.fire({
            title: 'Session expirée',
            text: 'Veuillez vous reconnecter',
            icon: 'warning',
            confirmButtonText: 'OK' 
        })
         authService.logOut()
         route.navigate(['/login']);
         return next(authReq);
      }
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
      //console.log("auth req "+JSON.stringify(authReq.headers))
    }
    return next(authReq);

    
  };