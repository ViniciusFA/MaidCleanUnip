import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService{

    private usuarioAutenticado:boolean = false;
    //variavel pública
    mostrarMenuEmitter = new EventEmitter<boolean>();

    constructor(private router:Router){

    }

    fazerLogin(usuario:Usuario){
        if(usuario.nome == "Vini" &&
          usuario.senha == "123"){

            let permissoes = {
              acessaHome: true,
              acessaFuncionario: true,
              acessaContato: false,
              acessaLegislacao: false,
              acessaOportunidade: false,
            };

            localStorage.setItem('permissoes', JSON.stringify(permissoes));

            this.usuarioAutenticado = true;
            this.mostrarMenuEmitter.emit(true);
            this.router.navigate(['home'], { queryParams : { reload: true } });
          }else{
            this.usuarioAutenticado = false;
            this.mostrarMenuEmitter.emit(false);
          }
      }
      
      usuarioEstaAutenticado(){
        return this.usuarioAutenticado;
      }
    }