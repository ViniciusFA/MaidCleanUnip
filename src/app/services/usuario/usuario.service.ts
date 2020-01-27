import { Injectable } from '@angular/core';
import { RoleEnum } from './../../system-objects/role-enum';
import { Usuario } from './../../system-objects/usuario-model';
import { ConfigService } from './../config.service';
import { RequestOptions, Http, Headers } from '@angular/http';

@Injectable()
export class UsuarioService {

    private baseUrlService: string = '';
    private baseUrlServiceWithoutUser:String ='';
    private headers: Headers;
    private options: RequestOptions;
    usuarioFuncionario: Usuario[] = new Array();


    constructor(private http: Http,
        private configService: ConfigService) {
        this.baseUrlService = configService.getUrlService() + '/usuario';
        this.baseUrlServiceWithoutUser = configService.getUrlService();
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = new RequestOptions({ headers: this.headers });
    }


    /**CONSULTA TODAS OS USUÁRIOS CADASTRADAS */
    getUsuarios() {
        return this.http.get(this.baseUrlService).map(res => res.json());
    }

    getUsuariosPorPerfil(idRole: Number) {
        return this.http.get(this.baseUrlServiceWithoutUser + '/idRole/' + idRole).map(res => res.json());
    }
   
    getUsuarioPorLogin(login: String){
        return this.http.get(this.baseUrlService + "/login" + "/" + login)
        .map(res => res.json());
    }

     //ADICIONA UMA NOVA PESSOA 
     addUsuario(usuario: Usuario) {
        return this.http.post(this.baseUrlService, JSON.stringify(usuario), this.options)
            .map(res => res.json());
    }
    

    /**EXCLUI UMA PESSOA */
    deleteUsuario(codigo: number) {
        return this.http.delete(this.baseUrlService + '/' + codigo).map(res => res.json());
    }

    /**CONSULTA UMA PESSOA PELO CÓDIGO */
    getUsuario(codigo: number) {
        return this.http.get(this.baseUrlService + '/' + codigo).map(res => res.json());
    }

    /**ATUALIZA INFORMAÇÕES DA PESSOA */
    updateUsuario(usuario: Usuario) {
        return this.http.put(this.baseUrlService, JSON.stringify(usuario), this.options)
            .map(res => res.json());
    }

    
}