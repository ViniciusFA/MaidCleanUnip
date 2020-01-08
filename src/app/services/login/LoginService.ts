import { Usuario } from './../../system-objects/usuario-model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from '../config.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;

    constructor(private http:Http,
                private configService: ConfigService){
                    this.baseUrlService = configService.getUrlService() ;
                    this.headers = new Headers ({ 'Content-Type': 'application/json;charset=UTF-8' })
                    this.options = new RequestOptions ({ headers : this.headers});
                }

    verificarUsuario(usuario: Usuario){        

        return this.http.get(this.baseUrlService  + "/usuario/" + usuario.login, this.options)
        .map(res => res.json());
    }

    verificarLogin(login:String , senha:String){
        return this.http.get(this.baseUrlService + "/usuario/" + login 
        + "/" + senha).map(res => res.json());
    }

    verificarEmail(email:String){
        return this.http.get(this.baseUrlService + "/usuario" + "/email/" +  email)
        .map(res => res.json());
    }
    
    enviarEmail(email:String){
        return this.http.get(this.baseUrlService + "/emailSend/" + email)
        .map(res => res.json());
    }


}