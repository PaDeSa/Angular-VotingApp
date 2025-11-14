import {
  HttpClient,
  HttpContext,
  HttpResponse,
} from '@angular/common/http';

import {
  filter,
  map,
  Observable,
} from 'rxjs';

import { StrictHttpResponse } from '../generic/strict-http-response';
import { RequestBuilder } from '../request-builder';
import { ApiResponse } from '../response/api-response';

export interface Users$Params {
    page?: number;
    size?: number;
}

export interface UploadCoverPicture$Params {
  'id': number;
      body?: {
'file': Blob;
}
}

export function users(http:HttpClient,
    rootUrl: string,
    params?: Users$Params,context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {

        const rb = new RequestBuilder(rootUrl,users.PATH, 'get')
    if (params) {
        rb.query('page', params.page, {});
        rb.query('size', params.size, {});
    }
    return http.request(
        rb.build({
            responseType: 'json',
            accept: 'application/json',
            context: context
        })
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<ApiResponse>;
        })
    );


}

users.PATH = '/api/v1/users/all';


export function uploadUserProfilePicture(http:HttpClient,
    rootUrl: string,
    params: UploadCoverPicture$Params,
    context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {
    const rb = new RequestBuilder(rootUrl,uploadUserProfilePicture.PATH, 'post')

     if (params) {
        rb.path('id', params['id'], {});
        rb.body(params.body, 'multipart/form-data');
  }
    return http.request(
        rb.build({            
            responseType: 'json',
            accept: 'application/json',
            context: context
        })
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<ApiResponse>;
        })
    );
}

uploadUserProfilePicture.PATH = '/api/v1/users/upload/{id}';