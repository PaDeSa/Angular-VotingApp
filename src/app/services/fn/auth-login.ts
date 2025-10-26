import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { AuthRequest } from "../model/auth-request";
import { filter, map, Observable } from "rxjs";
import { StrictHttpResponse } from "../generic/strict-http-response";
import { RequestBuilder } from "../request-builder";
import { ApiResponse } from "../response/api-response";


export interface Auth$Params{
    body: AuthRequest;
}
export interface Register$Params{
    body: AuthRequest;
}

export function login(http:HttpClient,
    rootUrl: string,
    params: Auth$Params,context?: HttpContext):Observable<StrictHttpResponse<ApiResponse>> {

    const requestBody = new RequestBuilder(rootUrl,login.PATH, 'post')
    if(params){
        requestBody.body(params.body, 'application/json');
    }
    return http.request(
        requestBody.build({
            responseType:'json',
            accept:'*/*',
            context: context
        })
            
        ).pipe(
            filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<ApiResponse>;
            })
        );
}

login.PATH = '/api/v1/auth/login';
export function register(
  http: HttpClient,
  rootUrl: string,
  params: Register$Params,
  context?: HttpContext
): Observable<StrictHttpResponse<ApiResponse>> {
  const requestBody = new RequestBuilder(rootUrl, register.PATH, 'post');
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

register.PATH = '/api/v1/auth/register';