import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum } from 'src/app/system-objects/role-enum';

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService{

    private usuarioAutenticado:boolean = false;
    //variavel pública
    mostrarMenuEmitter = new EventEmitter<boolean>();

    constructor(private router:Router){

    }

  liberaPermissao(idRole: number) {
    let permissoes: any;

    if (idRole === RoleEnum.Admin) {
      permissoes = {
        acessaAnuncie: true,
        acessaFuncionario: true,
        acessaLegislacao: true,
        acessaOportunidade: true,
        acessaCadastro: false,
        acessaEntrar: false,
        acessaLogout: true
      }
    }

    if (idRole === RoleEnum.Empregador) {
      permissoes = {
        acessaAnuncie: true,
        acessaFuncionario: true,
        acessaLegislacao: false,
        acessaOportunidade: false,
        acessaCadastro: false,
        acessaEntrar: false,
        acessaLogout: true
      }
    }

    if (idRole === RoleEnum.Funcionario) {
      permissoes = {
        acessaAnuncie: false,
        acessaFuncionario: false,
        acessaLegislacao: true,
        acessaOportunidade: true,
        acessaCadastro: false,
        acessaEntrar: false,
        acessaLogout: true
      }
    }

    localStorage.setItem('permissoes', JSON.stringify(permissoes));

    this.usuarioAutenticado = true;
    this.mostrarMenuEmitter.emit(true);
    this.router.navigate(['home'], { queryParams: { reload: true } });
  }
      
      usuarioEstaAutenticado(){
        return this.usuarioAutenticado;
      }
    }