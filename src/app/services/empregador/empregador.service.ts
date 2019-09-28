import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpregadorService {

    private baseUrl =''
        
    constructor(private http: HttpClient){}

    getEmpregador(id: number):Observable<any>{
        return this.http.get('${this.baseUrl}/${id}');
    }

    criarEmpregador(empregador: Object):Observable<Object> {
        return this.http.post(`${this.baseUrl}`, empregador);
    }

    atualizarEmpregador(id: number, value:any): Observable<Object>{
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    apagarEmpregador(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/${id}`, {
            responseType: 'text'
        });
    }

    getEmpregadorLista():Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
}