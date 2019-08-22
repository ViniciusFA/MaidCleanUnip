import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContatoComponent } from './contato/contato.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { RankingComponent } from './ranking/ranking.component';
import { CadastroEmpregadoComponent } from './cadastro/cadastro-empregado/cadastro-empregado.component';
import { CadastroEmpregadorComponent } from './cadastro/cadastro-empregador/cadastro-empregador.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ConfiguracoesContaComponent } from './configuracoes/configuracoes-conta/configuracoes-conta.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'pesquisar', component: PesquisarComponent},
    {path: 'ranking', component: RankingComponent},
    {path: 'contato', component: ContatoComponent},
    {path: 'cadastro-empregado', component: CadastroEmpregadoComponent},
    {path: 'cadastro-empregador', component: CadastroEmpregadorComponent},
    {path: 'configuracoes', component: ConfiguracoesComponent},
    {path: 'configuracoesConta', component: ConfiguracoesContaComponent},
    {path: 'perfil', component: PerfilComponent}
    
    
]