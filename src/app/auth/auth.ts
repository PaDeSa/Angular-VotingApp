import {
  HttpClient,
  HttpContext,
} from '@angular/common/http';
import {
  inject,
  Injectable,
} from '@angular/core';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import {
  map,
  Observable,
} from 'rxjs';
import Swal from 'sweetalert2';

import {
  Auth$Params,
  login,
  register,
  Register$Params,
} from '../services/fn/auth-login';
import { ApiConfiguration } from '../services/generic/api-configuration';
import { BaseService } from '../services/generic/base-service';
import { StrictHttpResponse } from '../services/generic/strict-http-response';
import { ApiResponse } from '../services/response/api-response';

interface TokenPayload {
  exp: number;
  [key: string]: any;
}

interface Role {
  roleName?: string;
}

interface AuthUser {
  roles?: Role[];
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class Auth extends BaseService{
  private router = inject(Router)

   
  constructor(config:ApiConfiguration,http:HttpClient) {
    super(config, http);
  }

  static readonly loginPath = '/api/v1/auth/login';
  static readonly registerPath = '/api/v1/auth/register';
 /** REGISTER */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponse>> {
    return register(this.http, this.rootUrl, params, context);
  }

  register(params: Register$Params, context?: HttpContext): Observable<ApiResponse> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
  }

  login$Response(params: Auth$Params, context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    return login(this.http, this.rootUrl, params, context);
  }

  login(params: Auth$Params, context?: HttpContext):Observable<ApiResponse> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
  }



  // login(data:any):Observable<any>{
  //  return this.http.post(`${environment.apiUrl}/api/v1/auth/login`,data);
  // }

  public tokenExpired(token:any):boolean{
    const payload = this.getRawToken(token);
    if (!payload || typeof payload.exp !== 'number') {
      return true;
    }
    return moment().unix() > payload.exp;
  }
   
  getRawToken(accessToken:any): TokenPayload | undefined{
    if (!accessToken) {
      return undefined;
    }
    try {
      return jwtDecode<TokenPayload>(accessToken);
    } catch {
      return undefined;
    }
  }


  getToken(){
    return sessionStorage.getItem('token');
    //return localStorage.getItem('token');
  }
  
  getUserAuth(){
   const userStr = sessionStorage.getItem("user");
    if (userStr == null) {
      return null;
    }
    try {
      return JSON.parse(userStr) as AuthUser;
    } catch {
      return null;
    }
  }
  
  store(token:any,user:any){
   sessionStorage.setItem('token',token)
   sessionStorage.setItem('user',JSON.stringify(user))
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token || this.tokenExpired(token)) {
      return false;
    }
    return true;
  }

  isAdmin(user:string): boolean {
    try {
      const userObject = JSON.parse(user) as AuthUser;
      const roles = Array.isArray(userObject.roles) ? userObject.roles : [];
      return roles.some(role => role?.roleName === 'ADMIN');
    } catch {
      return false;
    }
  }

  isSupervisor(user:string): boolean {
     try {
      const userObject = JSON.parse(user) as AuthUser;
      const roles = Array.isArray(userObject.roles) ? userObject.roles : [];
      return roles.some(role => role?.roleName === 'SUPERVISOR');
    } catch {
      return false;
    }
  }

  isElector(user:string): boolean {
     try {
      const userObject = JSON.parse(user) as AuthUser;
      const roles = Array.isArray(userObject.roles) ? userObject.roles : [];
      return roles.some(role => role?.roleName === 'ELECTOR');
    } catch {
      return false;
    }
  }



  public logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
    
  }
 
  showSessionExpiredAlert(): void {
    Swal.fire({
      title: 'Session expirée',
      text: 'Veuillez vous reconnecter',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
  
}
