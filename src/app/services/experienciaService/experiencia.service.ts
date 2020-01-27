import { Injectable } from '@angular/core';
import { ConfigService } from './../config.service';
import { RequestOptions, Http, Headers } from '@angular/http';

@Injectable()
export class ExperienciaService{

    private baseUrlService: string = '';
    private headers: Headers;
    private options: RequestOptions;

    constructor(private Http: Http,
                private configService: ConfigService){
                    this.baseUrlService = configService.getUrlService() + '/experiencia';
                    this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                    this.options = new RequestOptions({ headers: this.headers });
                }

    getExperiences(){
        return this.Http.get(this.baseUrlService).map(res => res.json());
    }
}