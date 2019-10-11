import { Component, OnInit } from '@angular/core';
import { Login } from '../services/login/Login';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from '../services/login/LoginService';
import { AutenticacaoService } from '../services/login/AutenticacaoService';
import { Router } from '@angular/router';
import { Response } from '../services/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


  private login:Login = new Login();
  private formulario:FormGroup;
  private nm_usuario:string ='ViniAdm';
  private senha:string = '';
  private loginInvalido:boolean = false;

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

 verificaLogin(){
   if(this.authService.authenticate(this.nm_usuario,this.senha)){
    this.router.navigate(['']);
    this.loginInvalido = false;
   }else{
     this.loginInvalido = true;
   }
 }

  logar(){
    let login = this.formulario.value as Login;

    if(login.nm_usuario == null || login.nm_usuario == "" 
      || login.senha == null || login.senha ==""){
        alert("Campo vazio. Preencha o usuário e senha para prosseguir.");
    }else{

    
    this.loginService.verificarUsuario(login)
    .subscribe(response =>{

        this.login = response;
        //trocar o || por && quando conseguir pegar o conteúdo do nm_usuario
        if(this.login.nm_usuario || this.login.senha){
          alert("Usuário encontrado com sucesso.");
          this.router.navigate[''];
        }else{
          alert("Usuário não encontrado / cadastrado.")
        }
      });    
    }
  }
}
