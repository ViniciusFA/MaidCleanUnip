import { Component, OnInit } from '@angular/core';
import { Login } from '../services/login/Login';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from '../services/login/LoginService';
import { AutenticacaoService } from '../services/login/AutenticacaoService';
import { Router } from '@angular/router';
import { Response } from '../services/response';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


  private login:Login = new Login();
  private formulario:FormGroup;

  constructor(private loginService:LoginService,
              private formBuilder:FormBuilder,
              private router:Router,
              private authService:AutenticacaoService) { 

              this.configurarFormulario();
  }

  ngOnInit() {
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      nm_usuario: new FormControl(''),
      senha: new FormControl(''),
    });
  }


  logar(){
    let login = this.formulario.value as Login;

    //verifica se campos foram preenchidos
    if(login.nm_usuario == null || login.nm_usuario == "" 
      || login.senha == null || login.senha ==""){
        alert("Campo vazio. Preencha o usuário e senha para prosseguir.");
    }else{

    
    this.loginService.verificarUsuario(login)
    .subscribe(response =>{
     
        if(login.nm_usuario == response.login && login.senha == response.senha){
          alert("Seja Bem vindo.");

          //fecha o modal
          this.fecharModal();

          //redireciona para a pagina home
          this.router.navigate(['']);
        }
        else if(login.nm_usuario == response.login 
                && login.senha != response.senha){
          alert("Senha inválida.");
        }
      },
      (erro) => {
        alert("Usuário não cadastrado.");
      });
    }
  }

  fecharModal(){
    
  }

}
