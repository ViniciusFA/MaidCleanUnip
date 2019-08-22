import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-empregador',
  templateUrl: './cadastro-empregador.component.html'
})
export class CadastroEmpregadorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  voltar():void{
    this.router.navigate(['/cadastro']);
  }


}
