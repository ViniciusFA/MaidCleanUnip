import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import  { ROUTES } from './app.routes';

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
import { FuncionariosCadastradosComponent } from './pesquisar/funcionarios-cadastrados/funcionarios-cadastrados.component';
import { RankingComponent } from './ranking/ranking.component';
import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './perfil/perfil.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ConfiguracoesContaComponent } from './configuracoes/configuracoes-conta/configuracoes-conta.component';



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
    FuncionariosCadastradosComponent,
    RankingComponent,
    PerfilComponent,
    ConfiguracoesComponent,
    ConfiguracoesContaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [  
    AppComponent,  
    HeaderComponent
  ]
})
export class AppModule { }
