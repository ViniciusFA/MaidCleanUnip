import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../services/usuario';
import { AutenticacaoService } from '../services/login/AutenticacaoService';
import { HeaderComponent } from '../header/header.component';
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

  configurarFormularioLogin(){
    this.formulario = this.formBuilder.group({
      nome: new FormControl(''),
      senha: new FormControl(''),
    });
  }

  
  logar(){    
    this.usuario = this.formulario.value;
    this.authService.fazerLogin(this.usuario);
    // this.headerComponent.receberParamLogin(true);
  }

}
