import { HomeComponent } from './../home/home.component';
import { LoaderProvider } from './../../providers/loader-provider';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../../system-objects/usuario-model';
import { AutenticacaoService } from '../../services/login/AutenticacaoService';
import { HeaderComponent } from '../../header/header.component';
import { Response } from '../../services/response';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LoginService } from 'src/app/services/login/LoginService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',  
})
export class LoginComponent implements OnInit {

  private formulario: FormGroup;
  private formularioEsqueceuSenha: FormGroup;
  private usuario: Usuario;
  mostrarMenu: boolean = false;
  private resposta: Boolean = false;
  private loadingPage: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private loaderProvider: LoaderProvider,
    private elRef: ElementRef) {
    this.configurarFormularioLogin();
  }

  ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

  configurarFormularioLogin() {
    this.formulario = this.formBuilder.group({
      login: new FormControl(''),
      senha: new FormControl(''),
    });
  }  

  logar() {
    if (this.formulario.invalid) {
      return;
    }

    this.usuario = this.formulario.value;

    this.loginService.verificarLogin(this.usuario.login, this.usuario.senha)
      .subscribe(response => {
        let res: Response = <Response>response;
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.formulario.reset();
          //this.authService.liberaPermissao(res.idRole);
          this.authService.liberaPermissao(res.id_role);
          this.router.navigate(["home"])
            .then(() => {
              window.location.reload();
            });

        } else {
          alert(res.mensagem);
        }
      })

  }

  ngOnDestroy() {
    if (this.loadingPage) {
      this.loadingPage.unsubscribe();
    }
  }

  redefinirSenha(email:String){    
   console.log(email);
    alert("Verifique o link que foi enviado para o seu email.");
  }

}
