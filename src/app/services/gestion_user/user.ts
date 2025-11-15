import {
  HttpClient,
  HttpContext,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  map,
  Observable,
} from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class User extends BaseService{

   constructor(config:ApiConfiguration,http:HttpClient) {
    super(config, http);
  }

  


  findAllUsers$Response(params?: Users$Params, context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    return users(this.http, this.rootUrl, params, context);
  }

  findAllUsers(params?: Users$Params, context?: HttpContext):Observable<ApiResponse> {
    return this.findAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
  }


  uploadUserProfilePicture$Response(params: UploadCoverPicture$Params, context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
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

  
  
  
}
