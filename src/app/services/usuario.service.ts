import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Http,Headers, RequestOptions } from '@angular/http';
import {Usuario} from '../services/usuario';
import {ConfigService} from './config.service';


@Injectable()
export class UsuarioService{

    private baseUrlService: string = '';
    private headers: Headers;
    private options:RequestOptions;

    constructor(private http: Http, 
        private configService: ConfigService){
            /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
            this.baseUrlService = configService.getUrlService() + '/usuario/';

            /*ADICIONANDO O JSON NO HEADER */
            this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
            this.options = new RequestOptions({ headers: this.headers });
        }

           /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
           getUsuarios(){
               return this.http.get(this.baseUrlService).map(resp => resp.json());
           }
           /**ADICIONA UMA NOVA PESSOA */
           addUsuario(usuario:Usuario){
               return this.http.post(this.baseUrlService, JSON.stringify(usuario), this.options);
           }
            /**EXCLUI UMA PESSOA */
           excluirUsuario(codigo:number){
                return this.http.delete(this.baseUrlService + codigo).map(res => res.json());
            }
            /**CONSULTA UMA PESSOA PELO CÓDIGO */
            getUsuario(codigo:number){
                return this.http.get(this.baseUrlService + codigo).map(res => res.json()); 
            }
            /**ATUALIZA INFORMAÇÕES DA PESSOA */
            atualizarUsuario(usuario:Usuario){
                return this.http.put(this.baseUrlService, JSON.stringify(usuario), this.options)
                .map(res => res.json())
            }

}