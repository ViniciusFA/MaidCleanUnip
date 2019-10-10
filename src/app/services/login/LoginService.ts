import { Login } from '../login/Login';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from '../config.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    
    private ds_login:string;
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;

    private codigo:Number;


    constructor(private http:Http,
                private configService: ConfigService){
                    this.baseUrlService = configService.getUrlService();
                    this.headers = new Headers ({ 'Content-Type':'application/json;charset=UTF-8' })
                    this.options = new RequestOptions ({ headers : this.headers});
                }

    verificarUsuario(login: Login){        

        console.log("Nome do usuario: " + login.nm_usuario);
        return this.http.post(this.baseUrlService + "/usuario", JSON.stringify(login),this.options)
        .map(res => res.json());
    }
}