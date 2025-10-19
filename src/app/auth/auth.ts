import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { environment } from '../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { BaseService } from '../services/generic/base-service';
import { ApiConfiguration } from '../services/generic/api-configuration';
import { Auth$Params, login } from '../services/fn/auth-login';
import { StrictHttpResponse } from '../services/generic/strict-http-response';
import { ApiResponse } from '../services/response/api-response';

interface TokenPayload {
  exp: number;
  [key: string]: any;
}

interface Role {
  name?: string;
}

interface AuthUser {
  roles?: Role[];
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class Auth extends BaseService{

   
  constructor(config:ApiConfiguration,http:HttpClient) {
    super(config, http);
  }

  static readonly loginPath = '/api/v1/auth/login';


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
    return localStorage.getItem("user")
  }
  
  store(token:any,user:any){
   sessionStorage.setItem('token',token)
   sessionStorage.setItem('user',user)
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
      return roles.some(role => role?.name === 'ADMIN');
    } catch {
      return false;
    }
  }

  public logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return true;
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
