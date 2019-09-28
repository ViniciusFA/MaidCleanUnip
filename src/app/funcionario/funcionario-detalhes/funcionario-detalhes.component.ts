import { Funcionario } from '../../services/funcionario/funcionario';
import { Component, OnInit, Input } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-funcionario-detalhes',
  templateUrl: './funcionario-detalhes.component.html'
})
export class FuncionarioDetalhesComponent implements OnInit {

  id:number;
  funcionario:Funcionario;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private funcionarioService: FuncionarioService) { }

  ngOnInit() {
    this.funcionario = new Funcionario();

    this.id = this.route.snapshot.params['id'];

    this.funcionarioService.getFuncionario(this.id)
    .subscribe(data => {
      console.log(data)
      this.funcionario = data;
    }, error => console.log(error));
  }


}
