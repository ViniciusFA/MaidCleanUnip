import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-funcionario',
  templateUrl: './info-funcionario.component.html'
})
export class InfoFuncionarioComponent implements OnInit {

  private titulo:string;

  constructor() { }

  ngOnInit() {
    this.titulo = "Informação Funcionário"
  }

  excluirFuncionario(){}
  
  atualizarFuncionario(){}

}