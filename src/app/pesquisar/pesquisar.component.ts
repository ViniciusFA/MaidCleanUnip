import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FuncionarioService } from '../services/funcionario/funcionario.service';
import { Funcionario } from '../services/funcionario/funcionario';
import { Response } from '../services/response';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html'
})
export class PesquisarComponent implements OnInit {
  
  private funcionarios: Funcionario[] = new Array();
  private titulo:string;

  constructor(private funcionarioService: FuncionarioService,
    private router: Router) {}

  ngOnInit(){
    this.funcionarioService.getFuncionarios().subscribe(res => this.funcionarios = res);
    console.log("Funcionarios vindo dentor de ngOnInit" + this.funcionarios);
    }

    /**EXCLUI UM REGISTRO QUANDO CLICAMOS NA OPÇÃO EXCLUIR DE UMA 
     * LINHA DA TABELA*/
    excluir(codigo:number, index:number):void{
      if(confirm("Deseja realmente excluir esse funcionário?")){

        /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
        this.funcionarioService.deleteFuncionario(codigo).subscribe(response =>{

        /**PEGA O RESPONSE DO SERVIÇO */
        let res:Response = <Response>response;
        
        /*1 = SUCESSO
              * MOSTRAMOS A MENSAGEM RETORNADA PELO SERVIÇO E DEPOIS REMOVEMOS
              O REGISTRO DA TABELA HTML*/
              if(res.codigo == 1){
                alert(res.mensagem);
                this.funcionarios.splice(index,1);
              }
              else{
                /*0 = EXCEPTION GERADA NO SERVIÇO JAVA */
                alert(res.mensagem);
              }
            },
            (erro) => {
              /*MOSTRA ERROS NÃO TRATADOS */
              alert(erro);
        });
      }
    }
 
}
