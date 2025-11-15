import {
  HttpBackend,
  HttpClient,
  HttpContext,
} from '@angular/common/http';
import {
  inject,
  Injectable,
} from '@angular/core';

import {
  map,
  Observable,
} from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  listElectors,
  UploadCoverPicture$Params,
  uploadUserProfilePicture,
  users,
  Users$Params,
} from '../fn/user.fn';
import { ApiConfiguration } from '../generic/api-configuration';
import { BaseService } from '../generic/base-service';
import { StrictHttpResponse } from '../generic/strict-http-response';
import { ApiResponse } from '../response/api-response';
import { Auth } from '../services';

@Injectable({
  providedIn: 'root'
})
export class User extends BaseService{

   constructor(config:ApiConfiguration,http:HttpClient) {
    super(config, http);
  }

  private authS = inject(Auth);
  private http2= inject(HttpClient) 
  private handler= inject(HttpBackend) as HttpBackend


  findAllUsers$Response(params?: Users$Params, context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    return users(this.http, this.rootUrl, params, context);
  }

  findAllUsers(params?: Users$Params, context?: HttpContext):Observable<ApiResponse> {
    return this.findAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
  }


  uploadUserProfilePicture$Response(params: {id: number, body?: {'file': Blob}}, context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    return uploadUserProfilePicture(this.http, this.rootUrl, params, context);
  }

  uploadUserProfilePicture(params: UploadCoverPicture$Params, context?: HttpContext):Observable<ApiResponse> {
    return this.uploadUserProfilePicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
  }


  listElectors$Response(context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    return listElectors(this.http, this.rootUrl, context);
  }

  listElectors(context?: HttpContext):Observable<ApiResponse> {
    return this.listElectors$Response(context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
  }

  uploadCover(id:any,data:any):Observable<any>{
    return this.postWithOption(`${environment.apiUrl}/users/upload/${id}`,data)
  }


   postWithOption(
    path: string,
    body: Object = {},
    httpHeaders?: any
  ): Observable<any> {
    this.http2 = new HttpClient(this.handler);
     const token = this.authS.getToken();
      let headers = {
        Authorization: `Bearer ${token}`,
      };
    //let headers={}
     if (httpHeaders) {
       headers = Object.assign(headers, httpHeaders);
     }
   
    return this.http2.post(path, body, { headers });
  }
  
  
}
