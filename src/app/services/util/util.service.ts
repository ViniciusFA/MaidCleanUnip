import { Usuario } from './../../system-objects/usuario-model';
import { ConfigService } from './../config.service';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService{

    private baseUrlService: string = '';
    private headers: Headers;
    private options: RequestOptions;
    private usuario:Usuario = new Usuario();

    private headers2: Headers;
    private options2: RequestOptions;

    constructor(private http: Http,
        private configService: ConfigService) {
        this.baseUrlService = configService.getUrlService() + '/foto';
        //this.headers= new Headers({});
        this.headers= new Headers({ 'Content-Type': undefined});
        this.options= new RequestOptions({headers: this.headers});

        this.headers2= new Headers({ 'Content-Type': 'application/json;charset=UTF-8'});
        this.options2= new RequestOptions({headers: this.headers2});
    }
  
    sendFoto(formData:FormData){
       //return this.http.post(this.baseUrlService + "?foto=" + formData + "&user=" + user, formData).map(data => data.json())
       return this.http.post(this.baseUrlService ,formData).map(data => data.json());
    }

    sendUser(user:Usuario){
        return this.http.post(this.baseUrlService + '/usuario',user,this.options2).map(data =>data.text());
    }

    getPhotoProfile(idUser:number){
        return this.http.get(this.baseUrlService + '/imgSource/' + idUser).map(data => data.text());
    }

}