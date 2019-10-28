import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../services/login/AutenticacaoService';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AutenticacaoService,
        private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
            //se usuario estiver logado retorna true os menus permitidos
        if (this.authService.usuarioEstaAutenticado()) {
            return true;
        }

        //se usuario não estiver logado, redirecione-o para página de login e retorne falso.
        this.router.navigate(['/login']);
        return false;
    }
}