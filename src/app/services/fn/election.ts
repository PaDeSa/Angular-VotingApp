import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { filter, map, Observable } from "rxjs";
import { StrictHttpResponse } from "../generic/strict-http-response";
import { RequestBuilder } from "../request-builder";
import { ApiResponse } from "../response/api-response";



export interface Elections$Params {
    page?: number;
    size?: number;
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

