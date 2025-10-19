import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ApiConfiguration{
    rootUrl=environment.apiUrl;
}


export interface ApiConfigurationInterface {
    rootUrl: string;
}