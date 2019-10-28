import { Login } from '../login/Login';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from '../config.service';
import { Injectable } from '@angular/core';
import { Funcionario } from '../funcionario/funcionario';
import { Usuario } from '../usuario';

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

        return this.http.get(this.baseUrlService + "/usuario" + "/" + login.nm_usuario, this.options)
        .map(res => res.json());
    }

    verificarLogin(login:String , senha:String){
        return this.http.get(this.baseUrlService + "/usuario" + "/" + login 
        + "/" + senha).map(res => res.json());
    }


}