import { Component, OnInit } from '@angular/core';
import { OpcaoCadastro } from './opcaoCadastro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router){}

  cadastros = [
    new OpcaoCadastro(0, 'Selecione'),
    new OpcaoCadastro(1, 'Empregador'),
    new OpcaoCadastro(2, 'Empregado'),
  ]; 
  
  ngOnInit() {    
  }

  abrirOpcao():void{
   let value = (<HTMLSelectElement>document.getElementById('opcaoCadastro')).value;
   
   if(value == 'Empregador'){
    this.router.navigate(['/cadastro-empregador']);
   }else if(value == 'Empregado'){
    this.router.navigate(['/cadastro-empregado']);
   }

  }

 

}
