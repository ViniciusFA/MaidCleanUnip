
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Funcionario } from '../../services/funcionario/funcionario';
import { Response } from '../../services/response';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-cadastro-empregado',
  templateUrl: './cadastro-empregado.component.html'
})
export class CadastroEmpregadoComponent implements OnInit {

  private titulo: string;
  private subtitulo:string;
  private funcionario:Funcionario = new Funcionario();
  formulario: FormGroup;

  constructor(private funcionarioService: FuncionarioService,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder) {}
          
  ngOnInit() {
    this.subtitulo="Funcionário";  
    this.configurarFormulario(); 
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({

      nome:this.formBuilder.control('',[Validators.required, Validators.minLength(3)]),
      sobrenome: this.formBuilder.control('',Validators.minLength(5)),
      login: this.formBuilder.control('',[Validators.required, Validators.minLength(3)]),
      senha: this.formBuilder.control('',[Validators.required, Validators.minLength(6),Validators.maxLength(8)]),
      avaliacao: this.formBuilder.control(''),
      sexo: this.formBuilder.control(''),
      email: this.formBuilder.control('',Validators.email),
      urlFacebook: this.formBuilder.control(''),
      hasWhatsapp: this.formBuilder.control(''),
      telefone: this.formBuilder.control(''),
      profissao: this.formBuilder.control(''),
      cpf: this.formBuilder.control(''),
      endereco: this.formBuilder.control(''),
      complemento: this.formBuilder.control(''),
      cidade: this.formBuilder.control(''),
      estado: this.formBuilder.control(''),
      experiencia: this.formBuilder.control(''),      
      cep: this.formBuilder.control('')
    });
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
         this.formulario.reset();  
  }
}
