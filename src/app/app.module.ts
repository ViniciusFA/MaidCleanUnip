import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { ROUTES } from './app.routes';
import { HttpModule } from '@angular/http';
import { ConfigService } from '../app/services/config.service';
import { FuncionarioService } from './services/funcionario/funcionario.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContatoComponent } from './contato/contato.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroEmpregadoComponent } from './cadastro/cadastro-empregado/cadastro-empregado.component';
import { CadastroEmpregadorComponent } from './cadastro/cadastro-empregador/cadastro-empregador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ConfiguracoesContaComponent } from './configuracoes/configuracoes-conta/configuracoes-conta.component';
import { LegislacaoComponent } from './legislacao/legislacao.component';
import {  NgxSocialButtonModule,
  FacebookLoginProvider,
  SocialServiceConfig
} from "ngx-social-button";
import { FuncionarioDetalhesComponent } from './funcionario/funcionario-detalhes/funcionario-detalhes.component';
import { OportunidadesComponent } from './oportunidades/oportunidades.component';
import { FormsModule }   from '@angular/forms';



// Configs
export function getAuthServiceConfigs() {
  let config = new SocialServiceConfig()
      .addFacebook("Your-Facebook-app-id")
      .addGoogle("Your-Google-Client-Id")
      .addLinkedIn("Your-LinkedIn-Client-Id");
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CadastroComponent,
    ContatoComponent,
    PesquisarComponent,
    CadastroEmpregadoComponent,
    CadastroEmpregadorComponent,
    OportunidadesComponent,
    PerfilComponent,
    ConfiguracoesComponent,
    ConfiguracoesContaComponent,
    LegislacaoComponent,
    FuncionarioDetalhesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    HttpModule,
    NgxSocialButtonModule
  ],
  providers: [ ConfigService, FuncionarioService,   
    {
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs,      
    }   
  ],
  bootstrap: [  
    AppComponent,  
    HeaderComponent
  ]
})
export class AppModule { }
