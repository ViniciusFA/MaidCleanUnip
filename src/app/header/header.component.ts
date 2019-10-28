import { Component, OnInit } from '@angular/core';
import {  SocialService } from "ngx-social-button";
import { AutenticacaoService } from '../services/login/AutenticacaoService';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login/LoginService';
import { Router } from '@angular/router';
import { Login } from '../services/login/Login';
import { Usuario } from './../system-objects/usuario-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
 
  shareObj = {
      href: "FACEBOOK-SHARE-LINK",
      hashtag:"#FACEBOOK-SHARE-HASGTAG"
  };

  private formulario:FormGroup;
  private usuario:Usuario;
  mostrarMenu:boolean = false;
  acessaAnuncie: Boolean = false;
  acessaFuncionario: Boolean = false;
  acessaLegislacao: Boolean = false;
  acessaOportunidade: Boolean = false;
  acessaCadastro: Boolean = false;
  acessaEntrar: Boolean = false;
  acessaLogout: Boolean = false;

  constructor(
    private router:Router,
  ) {
    
  }

  ngOnInit() {
    //this.mostrarMenu;

    let permissoes = JSON.parse(localStorage.getItem('permissoes'));
    if (permissoes === null || permissoes === undefined) {
      this.acessaAnuncie = false;
      this.acessaFuncionario = false;
      this.acessaLegislacao = false;
      this.acessaOportunidade = false;
      this.acessaLogout = false;
      this.acessaEntrar = true;
      this.acessaCadastro = true;
    } else {
      this.acessaAnuncie = permissoes.acessaAnuncie;
      this.acessaFuncionario = permissoes.acessaFuncionario;
      this.acessaLegislacao = permissoes.acessaLegislacao;
      this.acessaOportunidade = permissoes.acessaOportunidade;
      this.acessaLogout = permissoes.acessaLogout;
      this.acessaEntrar = permissoes.acessaEntrar;
      this.acessaCadastro = permissoes.acessaCadastro;
    }

    //console.log("mostrarMenu ngOnInit: " + this.mostrarMenu);
   }  

 
  receberParamLogin(mostrarMenu: boolean){
    this.mostrarMenu = mostrarMenu;
    //console.log("mostrarMenu ReceberParamLogin: " + this.mostrarMenu);
  }
  
  logout() {
    localStorage.removeItem('permissoes');
    this.router.navigate(['login'], { queryParams: { logout: true } })
    .then(()=>{
      window.location.reload();
    });
  }
}
