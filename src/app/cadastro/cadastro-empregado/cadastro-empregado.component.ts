
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Funcionario } from '../../services/funcionario/funcionario';
import { Response } from '../../services/response';

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
   
     /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
           E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
           if(res.codigo == 1){
            alert(res.mensagem);
            this.funcionario = new Funcionario();
           }
           else{
             /*
             ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
             NO SERVIDOR (CODIGO = 0)*/
             alert(res.mensagem);
           }
         },
         (erro) => {   
           /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
             EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */                 
            alert(erro);
         });                            
   
  }
}
