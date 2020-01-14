import { Injectable } from '@angular/core';
import { ConfigService } from './../config.service';
import { RequestOptions, Http, Headers } from '@angular/http';

@Injectable()
export class LocalidadeService {

    private baseUrlService: string = '';
    private headers: Headers;
    private options: RequestOptions;

    constructor(private Http: Http,
        private configService: ConfigService){
            this.baseUrlService = configService.getUrlService() + '/localidade';
            this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            this.options = new RequestOptions({ headers: this.headers });
    }

    //get citys of databse throught id_estado
    getCitys(id_estado: number){
       return this.Http.get(this.baseUrlService + '/cidades' + '/' + id_estado).map(res => res.json());
    }

    getStates(){
        return this.Http.get(this.baseUrlService + '/estados').map(res => res.json());
    }
}