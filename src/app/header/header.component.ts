import { Component, OnInit } from '@angular/core';
import {  SocialService } from "ngx-social-button";
import { AutenticacaoService } from '../services/login/AutenticacaoService';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login/LoginService';
import { Router } from '@angular/router';
import { Login } from '../services/login/Login';
import { Usuario } from '../services/usuario/usuario';

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

  acessaHome: Boolean = false;
  acessaFuncionario: Boolean = false;
  acessaContato: Boolean = false;
  acessaLegislacao: Boolean = false;
  acessaOportunidade: Boolean = false;

  constructor(
    private router:Router,
  ) {
    
  }

  ngOnInit() {
    //this.mostrarMenu;

    let permissoes = JSON.parse(localStorage.getItem('permissoes'));
    if (permissoes === null || permissoes === undefined) {
      this.acessaContato = false;
      this.acessaFuncionario = false;
      this.acessaHome = false;
      this.acessaLegislacao = false;
      this.acessaOportunidade = false;
    } else {
      this.acessaContato = permissoes.acessaContato;
      this.acessaFuncionario = permissoes.acessaFuncionario;
      this.acessaHome = permissoes.acessaHome;
      this.acessaLegislacao = permissoes.acessaLegislacao;
      this.acessaOportunidade = permissoes.acessaOportunidade;
    }

    console.log("mostrarMenu ngOnInit: " + this.mostrarMenu);
   }  

 
  receberParamLogin(mostrarMenu: boolean){
    this.mostrarMenu = mostrarMenu;
    console.log("mostrarMenu ReceberParamLogin: " + this.mostrarMenu);
  }
  
  logout() {
    localStorage.removeItem('permissoes');
    this.router.navigate(['login'], { queryParams: { logout: true } });
  }
}
