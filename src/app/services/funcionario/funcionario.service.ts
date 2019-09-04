import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {

  //  private funcionarioUrl: string;
   // private listaFuncionariosUrl: string;

   funcionarioUrl = 'http://localhost-8080/cadastro-empregado';
   listaFuncionariosUrl = 'http://localhost:8080/cadastro';
      
    constructor(private http: HttpClient){
    }

    getFuncionario(id: number):Observable<any>{
        return this.http.get('${this.baseUrl}/${id}');
    }

    criarFuncionario(funcionario: Object):Observable<Object> {
        return this.http.post(`${this.funcionarioUrl}`, funcionario);
    }

    atualizarFuncionario(id: number, value:any): Observable<Object>{
        return this.http.put(`${this.funcionarioUrl}/${id}`, value);
    }

    apagarFuncionario(id: number): Observable<any>{
        return this.http.delete(`${this.funcionarioUrl}/${id}`, {
            responseType: 'text'
        });
    }

    //getFuncionarioLista():Observable<any>{
      //  return this.http.get(`${this.listaFuncionariosUrl}`);
   // }
   getFuncionarioLista(){
       return this.http.get<any[]>(`${this.listaFuncionariosUrl}`);
   }

}