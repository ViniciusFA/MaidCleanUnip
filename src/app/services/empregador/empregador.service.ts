import { Usuario } from './../../system-objects/usuario-model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Empregador } from './empregador';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})

export class EmpregadorService {

    private baseUrlService:string ='';
    private headers:Headers;
    private options:RequestOptions;
        
    constructor(private http: Http,
                private configService: ConfigService){
                    this.baseUrlService = configService.getUrlService() + '/usuario';
                    this.headers = new Headers ({ 'Content-Type': 'application/json;charset=UTF-8' });
                    this.options = new RequestOptions ({ headers : this.headers});
                }

    getEmpregador(id: number){
        return this.http.get('${this.baseUrl}/${id}');
    }
    criarEmpregador(usuario: Usuario) {
        
        return this.http.post(this.baseUrlService, JSON.stringify(usuario),this.options)
        .map(res=>res.json());
    }
    atualizarEmpregador(id: number){
        this.baseUrlService = this.baseUrlService +'/id';
        return this.http.put(this.baseUrlService, id);
    }
    apagarEmpregador(id: number){
        this.baseUrlService = this.baseUrlService +'/id';
        return this.http.put(this.baseUrlService, id);
    }
    getEmpregadorLista(){
        return this.http.get(this.baseUrlService);
    }
}