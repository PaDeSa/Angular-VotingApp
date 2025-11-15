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
  Bulletin$Params,
  createBulletin,
  election,
  electionOpened,
  Elections$Params,
  getBulletins,
} from '../fn/election';
import { ApiConfiguration } from '../generic/api-configuration';
import { BaseService } from '../generic/base-service';
import { StrictHttpResponse } from '../generic/strict-http-response';
import { ApiResponse } from '../response/api-response';
import { Auth } from '../services';

const electionPath = '/api/v1/election';
const allPath = electionPath+'/all'
@Injectable({
  providedIn: 'root'
})
export class Election extends BaseService {

  private authS = inject(Auth);
    private http2= inject(HttpClient) 
    private handler= inject(HttpBackend) as HttpBackend

  constructor(config:ApiConfiguration,http:HttpClient) {
    super(config, http);
  }


  findAllElection$Response(params?: Elections$Params, context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    return election(this.http, this.rootUrl, params, context);
  }

  findAllElections(params?: Elections$Params, context?: HttpContext):Observable<ApiResponse> {
    return this.findAllElection$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
  }

  getBulletins$Response(context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    return getBulletins(this.http, this.rootUrl, context);
  }

  getBulletins(context?: HttpContext):Observable<ApiResponse> {
    return this.getBulletins$Response(context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
  }


  createBulletin$Response(params: Bulletin$Params, context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    return createBulletin(this.http, this.rootUrl, params, context);
  }

  createBulletin(params: Bulletin$Params, context?: HttpContext):Observable<ApiResponse> {
    return this.createBulletin$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
  }


  createBulletinV2(data:any):Observable<any>{
    return this.postWithOption(`${environment.apiUrl}/api/v1/bulletins/create`,data)
  }

  electionOpened$Response(context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    return electionOpened(this.http, this.rootUrl, context);   
  }

  electionOpened(context?: HttpContext):Observable<ApiResponse> {
    return this.electionOpened$Response(context).pipe(
      map((r: StrictHttpResponse<ApiResponse>) => r.body as ApiResponse)
    );
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
   // let headers={}
     if (httpHeaders) {
       headers = Object.assign(headers, httpHeaders);
     }
   
    return this.http2.post(path, body, { headers });
  }
  

  
}
