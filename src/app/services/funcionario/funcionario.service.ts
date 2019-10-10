import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/RX';

import { Funcionario } from '../../services/funcionario/funcionario';
import { ConfigService } from '../../services/config.service';

@Injectable()
export class FuncionarioService {

    private baseUrlService: string = '';
    private headers:Headers;
    private options:RequestOptions;
    

    constructor(private http:Http,
                //private router: Router,
                private configService:ConfigService){
                 
               /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
                this.baseUrlService = configService.getUrlService() + '/funcionario';

               /*ADICIONANDO O JSON NO HEADER */
                this.headers = new Headers ({ 'Content-Type': 'application/json;charset=UTF-8' });
                this.options = new RequestOptions ({ headers : this.headers});
            }

    
    /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
    getFuncionarios(){

        return this.http.get(this.baseUrlService ).map(res => res.json());       
    }

    /**ADICIONA UMA NOVA PESSOA */
    addFuncionario(funcionario: Funcionario){
        
        return this.http.post(this.baseUrlService, JSON.stringify(funcionario),this.options)
        .map(res => res.json());
    }

    /**EXCLUI UMA PESSOA */
    deleteFuncionario(codigo: number){

        return this.http.delete(this.baseUrlService + '/' +  codigo).map(res => res.json());
    }

    /**CONSULTA UMA PESSOA PELO CÓDIGO */
    getFuncionario(codigo: number){

        return this.http.get(this.baseUrlService + '/' + codigo).map(res => res.json());
    }
  
    /**ATUALIZA INFORMAÇÕES DA PESSOA */
    updateFuncionario(funcionario: Funcionario){
       
        return this.http.put(this.baseUrlService, JSON.stringify(funcionario),this.options)
        .map(res => res.json());
    }
}