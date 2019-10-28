import { Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { PesquisarComponent } from './pages/pesquisar/pesquisar.component';
import { CadastroEmpregadoComponent } from './pages/cadastro/cadastro-empregado/cadastro-empregado.component';
import { CadastroEmpregadorComponent } from './pages/cadastro/cadastro-empregador/cadastro-empregador.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ConfiguracoesContaComponent } from './configuracoes/configuracoes-conta/configuracoes-conta.component';
import { LegislacaoComponent } from './pages/legislacao/legislacao.component';
import { FuncionarioDetalhesComponent } from './pages/funcionario/funcionario-detalhes/funcionario-detalhes.component';
import { OportunidadesComponent } from './pages/oportunidades/oportunidades.component'
import { InfoFuncionarioComponent } from './pages/info-funcionario/info-funcionario.component';
import { AnuncieComponent } from './pages/anuncie/anuncie.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent },
    {path: 'contato', component: ContatoComponent},   
    {path: 'cadastro', component: CadastroComponent}, 
    {path: 'cadastro-empregado', component: CadastroEmpregadoComponent},
    {path: 'cadastro-empregador', component: CadastroEmpregadorComponent},
    {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},   
    {path: 'anuncie', component: AnuncieComponent, canActivate: [AuthGuard]},
    {path: 'pesquisar', component: PesquisarComponent, canActivate: [AuthGuard]}, 
    {path: 'legislacao', component: LegislacaoComponent, canActivate: [AuthGuard]}, 
    {path: 'oportunidades', component: OportunidadesComponent, canActivate: [AuthGuard]},
    {path: 'configuracoes', component: ConfiguracoesComponent, canActivate: [AuthGuard]},    
    {path: 'detalhes', component: FuncionarioDetalhesComponent, canActivate: [AuthGuard]},   
    {path: 'infoFuncionario', component: InfoFuncionarioComponent, canActivate: [AuthGuard]},
    {path: 'configuracoesConta', component: ConfiguracoesContaComponent, canActivate: [AuthGuard]},        
]