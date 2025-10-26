import { Injectable } from '@angular/core';
import { BaseService } from '../generic/base-service';
import { ApiConfiguration } from '../generic/api-configuration';
import { HttpClient, HttpContext } from '@angular/common/http';
import { election, Elections$Params } from '../fn/election';
import { map, Observable } from 'rxjs';
import { StrictHttpResponse } from '../generic/strict-http-response';
import { ApiResponse } from '../response/api-response';


const electionPath = '/api/v1/election';
const allPath = electionPath+'/all'
@Injectable({
  providedIn: 'root'
})
export class Election extends BaseService {

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

  

  
}
