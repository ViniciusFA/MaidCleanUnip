import { Component, OnInit } from '@angular/core';
import {  SocialService } from "ngx-social-button";
import { AutenticacaoService } from '../services/login/AutenticacaoService';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login/LoginService';
import { Router } from '@angular/router';
import { Login } from '../services/login/Login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
 
  shareObj = {
      href: "FACEBOOK-SHARE-LINK",
      hashtag:"#FACEBOOK-SHARE-HASGTAG"
  };

  private formulario:FormGroup;
  
  constructor(private loginService:LoginService,
              private formBuilder:FormBuilder,
              private router:Router,
              private socialAuthService: SocialService,
              private auth: AutenticacaoService){

                this.configurarFormularioLogin();
              }

  ngOnInit() {
   
  }  

  configurarFormularioLogin(){
    this.formulario = this.formBuilder.group({
      nm_usuario: new FormControl(''),
      senha: new FormControl(''),
    });
  }

  usuarioLogIn(){
    this.auth.usuarioLogIn();
  }

  signOut(){
    if(this.socialAuthService.isSocialLoggedIn()){
        this.socialAuthService.signOut().catch((err)=>{

        });
    }
  }

  getSocialUser(socialUser){
      console.log(socialUser);
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
       // socialPlatformProvider = FacebookLoginProvider.PROVIDER_TYPE;
    }else if(socialPlatform == "google"){
       // socialPlatformProvider = GoogleLoginProvider.PROVIDER_TYPE;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
    (socialUser) => {
        console.log(socialPlatform+" sign in data : " , socialUser);               
    });
  }

  fecharPopUo(callback){
    callback();
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
        alert(erro);
      });
    }
  }
  
  fecharModal(){}

}
