import { PesquisaFuncionario } from './PesquisaFuncionario';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from '../config.service';
import { Injectable } from '@angular/core';
import { Funcionario } from '../funcionario/funcionario';



@Injectable()
export class PesquisaFuncionarioService{

    private baseUrlService: string = '';
    private headers:Headers;
    private options:RequestOptions;
    
    constructor(private http:Http,
                private configService:ConfigService){

                this.baseUrlService = configService.getUrlService() + '/funcionario';

                this.headers = new Headers({'Content-Type' : 'application/json;charset=UTF-8'});
                this.options =new RequestOptions({headers: this.headers})
                }

    buscar(funcionario:Funcionario){
       return this.http.get(this.baseUrlService + '/search' ).map(res => res.json());
    }
}