import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {

    private baseUrl = '';

    constructor(private http: HttpClient){}

    getFuncionario(id: number):Observable<any>{
        return this.http.get('${this.baseUrl}/${id}');
    }

    criarFuncionario(funcionario: Object):Observable<Object> {
        return this.http.post(`${this.baseUrl}`, funcionario);
    }

    atualizarFuncionario(id: number, value:any): Observable<Object>{
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    apagarFuncionario(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/${id}`, {
            responseType: 'text'
        });
    }

    getFuncionarioLista():Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }

}