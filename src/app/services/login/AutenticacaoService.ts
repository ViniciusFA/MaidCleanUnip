import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService{

    constructor(){}

    authenticate(nm_usuario, senha){
        if(nm_usuario == "ViniAdm" && senha == "123"){
            sessionStorage.setItem('usuário' ,nm_usuario);
            return true;
        } else {
            return false;
        }
    }

    usuarioLogIn(){
        let user = sessionStorage.getItem('usuário');
        console.log(!(user == null));
        return !(user == null);
    }

    usuarioLogOut(){
        sessionStorage.removeItem('usuario');
    }
}