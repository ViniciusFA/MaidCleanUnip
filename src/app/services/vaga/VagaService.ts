import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from '../config.service';
import { Vaga } from './vaga';

@Injectable()
export class VagaService{

private baseUrlService:string = '';
private headers:Headers;
private options:RequestOptions;

constructor(private http:Http,
            private configService:ConfigService){
                this.baseUrlService = configService.getUrlService() + '/vagas';
                this.headers = new Headers({'Content-Type':'application/json;charset=UTF-8'});
                this.options = new RequestOptions ({headers:this.headers});
            }


    getVagas(){
        return this.http.get(this.baseUrlService).map(res => res.json());
    }

    anunciarVagas(vaga:Vaga){
        return this.http.post(this.baseUrlService,JSON.stringify(vaga),this.options)
        .map(res => res.json());
    }

}