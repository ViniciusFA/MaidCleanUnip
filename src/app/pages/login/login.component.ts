import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../../services/usuario';
import { AutenticacaoService } from '../../services/login/AutenticacaoService';
import { HeaderComponent } from '../../header/header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private formulario:FormGroup;
  private usuario:Usuario;
  mostrarMenu:boolean = false;
  
  constructor(private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private route: ActivatedRoute) {
    this.configurarFormularioLogin();
  }

  ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );  
  }

  get f(){
    return this.formulario.controls;
  }

  configurarFormularioLogin(){
    this.formulario = this.formBuilder.group({
      login: new FormControl(''),
      senha: new FormControl(''),
    });
  }
  
  logar(){    

    if(this.formulario.invalid){
      return;
    }

    /*
    var loginValue ='';

    if(this.f.login.value){
      loginValue += loginValue + "email=" + this.f.login.value + "&";
    }
    if(this.f.senha.value)
      loginValue += loginValue + "senha=" + this.f.senha.value +"&";
  */
    this.usuario = this.formulario.value;
    this.authService.fazerLogin(this.usuario);

    //var role = localStorage.getItem(AUTH_TOKEN.role);
    //console.log(role);
    // this.headerComponent.receberParamLogin(true);
  }

}
