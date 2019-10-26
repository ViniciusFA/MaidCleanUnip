import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContatoComponent } from './contato/contato.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroEmpregadoComponent } from './cadastro/cadastro-empregado/cadastro-empregado.component';
import { CadastroEmpregadorComponent } from './cadastro/cadastro-empregador/cadastro-empregador.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ConfiguracoesContaComponent } from './configuracoes/configuracoes-conta/configuracoes-conta.component';
import { LegislacaoComponent } from './legislacao/legislacao.component';
import { FuncionarioDetalhesComponent } from './funcionario/funcionario-detalhes/funcionario-detalhes.component';
import { OportunidadesComponent } from './oportunidades/oportunidades.component'
import { InfoFuncionarioComponent } from './info-funcionario/info-funcionario.component';
import { AnuncieComponent } from './anuncie/anuncie.component';


export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'pesquisar', component: PesquisarComponent},
    {path: 'contato', component: ContatoComponent},
    {path: 'cadastro-empregado', component: CadastroEmpregadoComponent},
    {path: 'cadastro-empregador', component: CadastroEmpregadorComponent},
    {path: 'configuracoes', component: ConfiguracoesComponent},
    {path: 'configuracoesConta', component: ConfiguracoesContaComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'legislacao', component: LegislacaoComponent},
    {path: 'detalhes', component: FuncionarioDetalhesComponent },
    {path: 'oportunidades', component: OportunidadesComponent },
    {path: 'infoFuncionario', component: InfoFuncionarioComponent } ,     
    {path: 'anuncie', component: AnuncieComponent }
]