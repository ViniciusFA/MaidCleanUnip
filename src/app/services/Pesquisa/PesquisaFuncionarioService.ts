import { Usuario } from './../../system-objects/usuario-model';
import { RoleEnum } from './../../system-objects/role-enum';
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
                this.baseUrlService = configService.getUrlService() + '/usuario';
                this.headers = new Headers({'Content-Type' : 'application/json;charset=UTF-8'});
                this.options =new RequestOptions({headers: this.headers})
                }


      buscar(usuarioFuncionario: PesquisaFuncionario) {
    //buscar(usuarioFuncionario: Usuario) {
        return this.http.get(this.baseUrlService + '/listaUsuarios', {params: usuarioFuncionario})
        .map(res => res.json());
    }
}