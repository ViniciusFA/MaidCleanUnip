
import { ConfigService } from '../config.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Contato } from "./contato.";
import { Injectable } from '@angular/core';

@Injectable()
export class ContatoService {

    private baseUrlService: string = '';
    private headers:Headers;
    private options:RequestOptions;

    constructor(private http:Http,
                //private router: Router,
                private configService:ConfigService){
                 
               /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
                this.baseUrlService = configService.getUrlService() + '/contato';

               /*ADICIONANDO O JSON NO HEADER */
                this.headers = new Headers ({ 'Content-Type': 'application/json;charset=UTF-8' });
                this.options = new RequestOptions ({ headers : this.headers});
            }

    sendMessage(contato:Contato){
        return this.http.post(this.baseUrlService, JSON.stringify(contato), this.options)
        .map(res => res.json());        
    }
}