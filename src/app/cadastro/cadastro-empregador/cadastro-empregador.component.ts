import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpregadorService } from '../../services/empregador/empregador.service';
import { Empregador } from 'src/app/services/empregador/empregador';

@Component({
  selector: 'app-cadastro-empregador',
  templateUrl: './cadastro-empregador.component.html'
})
export class CadastroEmpregadorComponent implements OnInit {

  empregador: Empregador = new Empregador();
  submetido = false;

  constructor(private empregadorService: EmpregadorService,
    private router: Router) { }

  ngOnInit() {
  }

  cadastrar():void{
    this.submetido = false;
    this.empregador = new Empregador();
  }

  salvar(){
    this.empregadorService.criarEmpregador(this.empregador)
    .subscribe(data => console.log(data), error => console.log(error));
    this.empregador = new Empregador();
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
