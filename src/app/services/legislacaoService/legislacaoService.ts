
import { HttpClient } from 'selenium-webdriver/http';
import { ConfigService } from '../config.service';
import { RequestOptions,Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LegislacaoService{
    
    private baseURLService:string = '';
    private headers:Headers;
    private option:RequestOptions;

    constructor(private http:Http,
                private configService:ConfigService){
                    this.baseURLService = configService.getUrlService() + '/legislacao';
                    this.headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
                    this.option = new RequestOptions ({ headers:this.headers})
                }


            postLegislacao(formData: FormData){
                return this.http.post(this.baseURLService,formData)
                .subscribe(resposta => console.log('Download OK.'));
            }

}