import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiConfiguration } from './api-configuration';

@Injectable({
    providedIn: 'root'
})
export class BaseService{

    constructor( protected config: ApiConfiguration,
        protected http:HttpClient
    ) {
       
    }
    private _rootUrl?: string ;


    get rootUrl(): string {
        return this._rootUrl || this.config.rootUrl;
    }

    set rootUrl(value: string) {
        this._rootUrl = value;
    }

}