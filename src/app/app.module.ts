import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTES } from './app.routes';
import { HttpModule } from '@angular/http';
import { ConfigService } from '../app/services/config.service';
import { FuncionarioService } from './services/funcionario/funcionario.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { PesquisarComponent } from './pages/pesquisar/pesquisar.component';
import { CadastroEmpregadoComponent } from './pages/cadastro/cadastro-empregado/cadastro-empregado.component';
import { CadastroEmpregadorComponent } from './pages/cadastro/cadastro-empregador/cadastro-empregador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ConfiguracoesContaComponent } from './configuracoes/configuracoes-conta/configuracoes-conta.component';
import { LegislacaoComponent } from './pages/legislacao/legislacao.component';
import {  NgxSocialButtonModule,
  FacebookLoginProvider,
  SocialServiceConfig
} from "ngx-social-button";
import { FuncionarioDetalhesComponent } from './pages/funcionario/funcionario-detalhes/funcionario-detalhes.component';
import { OportunidadesComponent } from './pages/oportunidades/oportunidades.component';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContatoService } from './services/contato/contato.service';
import { LoginService } from './services/login/LoginService';
import { PesquisaFuncionarioService } from './services/Pesquisa/PesquisaFuncionarioService';
import { InfoFuncionarioComponent } from './pages/info-funcionario/info-funcionario.component';
import { VagaService } from './services/vaga/VagaService';
import { AnuncieComponent } from './pages/anuncie/anuncie.component';
import { AutenticacaoService } from './services/login/AutenticacaoService';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

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
    FuncionarioDetalhesComponent,
    InfoFuncionarioComponent,
    AnuncieComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    HttpModule,
    HttpClientModule,
    NgxSocialButtonModule
  ],
  providers: [ ConfigService, FuncionarioService, ContatoService,LoginService,
              PesquisaFuncionarioService,VagaService,AutenticacaoService,AuthGuard,
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