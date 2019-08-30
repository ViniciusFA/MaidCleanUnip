import { Observable } from "rxjs";
import { Funcionario } from "../../services/funcionario/funcionario";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/FuncionarioService';

@Component({
  selector: 'app-funcionarios-cadastrados',
  templateUrl: './funcionarios-cadastrados.component.html'
})
export class FuncionariosCadastradosComponent implements OnInit {

  funcionarios:Observable<Funcionario[]>;

  constructor(private funcionarioService: FuncionarioService,
              private router: Router) { }

  ngOnInit() {
  }

  recarregarDados(){
    this.funcionarios = this.funcionarioService.getFuncionarioLista();
  }

  apagarFuncionario(id:number){
    this.funcionarioService.apagarFuncionario(id)
    .subscribe( data => {
      console.log(data);
      this.recarregarDados();
    },
    error => console.log(error));
  }

  detalhesFuncionario(id:number){
    this.router.navigate(['detalhes', id]);
  }

}
