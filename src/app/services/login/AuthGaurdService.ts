import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticacaoService } from './AutenticacaoService';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class AuthGaurdService implements CanActivate{

constructor(private router:Router,
            private authService:AutenticacaoService){}

canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if(this.authService.usuarioLogIn()){
        return true;
        this.router.navigate(['login']);
        return false;
    }
}

}