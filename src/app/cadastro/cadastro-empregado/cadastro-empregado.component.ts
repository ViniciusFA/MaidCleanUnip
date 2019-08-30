import { Funcionario } from '../../services/funcionario/funcionario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/FuncionarioService';

@Component({
  selector: 'app-cadastro-empregado',
  templateUrl: './cadastro-empregado.component.html'
})
export class CadastroEmpregadoComponent implements OnInit {

  funcionario: Funcionario = new Funcionario();
  submetido = false;

  constructor(private funcionarioService: FuncionarioService,
              private router: Router) { }

  ngOnInit() {
  }

  cadastrar(): void {
    this.submetido = false;
    this.funcionario = new Funcionario();
  }

  salvar(){
    this.funcionarioService.criarFuncionario(this.funcionario)
    .subscribe(data => console.log(data), error => console.log(error));
    this.funcionario = new Funcionario();
    this.irParaLista();
  }

  onSubmit(){
    this.submetido = true;
    this.salvar();
  }

  voltar():void{
    this.router.navigate(['/cadastro']);
  }

  irParaLista(){
    this.router.navigate(['/pesquisar']);
  }

}
