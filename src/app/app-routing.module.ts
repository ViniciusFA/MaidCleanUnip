import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoService } from './services/login/AutenticacaoService';


const routes: Routes = [
//{ path: 'login', component: LoginComponent,canActivate:[AutenticacaoService] },
  //{ path: 'logout', component: LogoutComponent,canActivate:[AutenticacaoService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
