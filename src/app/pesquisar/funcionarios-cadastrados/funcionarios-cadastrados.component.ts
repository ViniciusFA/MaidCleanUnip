import { Observable } from "rxjs";
import { Funcionario } from "../../services/funcionario/funcionario";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';

@Component({
  selector: 'app-funcionarios-cadastrados',
  templateUrl: './funcionarios-cadastrados.component.html'
})
export class FuncionariosCadastradosComponent implements OnInit {

  funcionarios:Observable<Funcionario[]>;

  funcionarioss: Array<any>;

  constructor(private funcionarioService: FuncionarioService,
              private router: Router) { }

  ngOnInit() {
    this.getFuncionarioLista();
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

  getFuncionarioLista(){
    this.funcionarioService.getFuncionarioLista().subscribe(dados => 
      this.funcionarioss = dados);
  }

}
