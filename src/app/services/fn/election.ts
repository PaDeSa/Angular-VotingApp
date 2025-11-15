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
import { BulletinRequest } from '../model/bulletin-request';
import { RequestBuilder } from '../request-builder';
import { ApiResponse } from '../response/api-response';

export interface Elections$Params {
    page?: number;
    size?: number;
}

export interface Bulletin$Params{
    body: BulletinRequest
}

export function election(http:HttpClient,
    rootUrl: string,
    params?: Elections$Params,context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {

    const rb = new RequestBuilder(rootUrl,election.PATH, 'get')
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

election.PATH = '/api/v1/election/all';


export function getBulletins(http:HttpClient,
    rootUrl: string,
    context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {

    const rb = new RequestBuilder(rootUrl,getBulletins.PATH, 'get')
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

getBulletins.PATH = '/api/v1/bulletins';


export function createBulletin(
  http: HttpClient,
  rootUrl: string,
  params: Bulletin$Params,
  context?: HttpContext
): Observable<StrictHttpResponse<ApiResponse>> {
  const requestBody = new RequestBuilder(rootUrl, createBulletin.PATH, 'post');
  if (params) {
    requestBody.body(params.body, 'application/json');
  }

  return http
    .request(
      requestBody.build({
        responseType: 'json',
        accept: '*/*',
        context: context
      })
    )
    .pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApiResponse>;
      })
    );
}

createBulletin.PATH = '/api/v1/bulletins/create';


export function electionOpened(
  http: HttpClient,
  rootUrl: string,
  context?: HttpContext
): Observable<StrictHttpResponse<ApiResponse>> {
  const rb = new RequestBuilder(rootUrl, electionOpened.PATH, 'get');
  return http
    .request(
      rb.build({
        responseType: 'json',
        accept: 'application/json',
        context: context
      })
    )
    .pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApiResponse>;
      })
    );
}

electionOpened.PATH = '/api/v1/election/get/active-by-user';