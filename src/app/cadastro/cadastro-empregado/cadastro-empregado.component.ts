import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-empregado',
  templateUrl: './cadastro-empregado.component.html'
})
export class CadastroEmpregadoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  voltar():void{
    this.router.navigate(['/cadastro']);
  }

}
