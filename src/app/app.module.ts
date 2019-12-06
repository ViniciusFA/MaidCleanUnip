import { UsuarioService } from './services/usuario/usuario.service';
import { LoaderProvider } from './providers/loader-provider';
import { LoginModule } from './pages/login/login.module';
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
import { CadastroFuncionarioComponent } from './pages/cadastro/cadastro-funcionario/cadastro-funcionario.component';
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
import { PesquisaFuncionarioService } from './services/Pesquisa/PesquisaFuncionarioService';
import { InfoFuncionarioComponent } from './pages/info-funcionario/info-funcionario.component';
import { VagaService } from './services/vaga/VagaService';
import { AnuncieComponent } from './pages/anuncie/anuncie.component';
import { AutenticacaoService } from './services/login/AutenticacaoService';
import { AuthGuard } from './guards/auth.guard';
import { OportunidadesModalComponent } from './pages/oportunidades/oportunidades-modal/oportunidade-modal.component';
import { AgmCoreModule} from '@agm/core';
import { ChatMessageComponent } from './pages/info-funcionario/chat-message/chat-message.component';
import { ChatMessageOportunityComponent } from './pages/oportunidades/oportunidades-modal/chat-message-oportunity/chat-message-oportunity.component';

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
    CadastroFuncionarioComponent,
    CadastroEmpregadorComponent,
    OportunidadesComponent,
    PerfilComponent,
    ConfiguracoesComponent,
    ConfiguracoesContaComponent,
    LegislacaoComponent,
    FuncionarioDetalhesComponent,
    InfoFuncionarioComponent,
    AnuncieComponent,
    OportunidadesModalComponent,
    ChatMessageComponent,
    ChatMessageOportunityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    HttpModule,
    HttpClientModule,
    NgxSocialButtonModule,
    LoginModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBz-1pNqOyCTlYTrR-cCQDorugLxnAoo5A'
    })
  ],
  providers: [ ConfigService, 
               FuncionarioService, 
               ContatoService,
               PesquisaFuncionarioService,
               VagaService,
               AutenticacaoService,
               AuthGuard,
               LoaderProvider,
               UsuarioService,
               OportunidadesModalComponent,
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