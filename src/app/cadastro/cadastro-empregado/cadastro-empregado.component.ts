
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Funcionario } from '../../services/funcionario/funcionario';
import { Response } from '../../services/response';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cadastro-empregado',
  templateUrl: './cadastro-empregado.component.html'
})
export class CadastroEmpregadoComponent implements OnInit {

  private titulo: string;
  private subtitulo:string;
  private funcionario:Funcionario = new Funcionario();

  constructor(private funcionarioService: FuncionarioService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {}

  /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */            
  ngOnInit() {
    this.subtitulo="Funcionário";   
  }

  /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
  salvar():void{


      /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
      this.funcionarioService.addFuncionario(this.funcionario)
                             .subscribe(response => {

     //PEGA O RESPONSE DO RETORNO DO SERVIÇO
      let res:Response = <Response>response;
     
   
    });
    console.log(this.funcionario);
    this.funcionario = new Funcionario();   
    alert("Funcionário acadastrado com sucesso.");
  }
}
