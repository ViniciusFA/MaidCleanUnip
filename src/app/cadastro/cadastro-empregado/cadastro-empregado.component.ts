
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Funcionario } from '../../services/funcionario/funcionario';
import { Response } from '../../services/response';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-cadastro-empregado',
  templateUrl: './cadastro-empregado.component.html'
})
export class CadastroEmpregadoComponent implements OnInit {

  private titulo: string;
  private subtitulo:string;
  private funcionario:Funcionario = new Funcionario();
  private formulario: FormGroup;

  constructor(private funcionarioService: FuncionarioService,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder) {

                this.configurarFormulario();
              }
          
  ngOnInit() {
    this.subtitulo="Funcionário";  
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({

      nome: new FormControl('',[Validators.required, Validators.minLength(3)]),
      sobrenome: new FormControl('',Validators.minLength(5)),
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      senha: new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(8)]),
      avaliacao: new FormControl(''),
      sexo: new FormControl(''),
      email: new FormControl('',Validators.email),
      urlFacebook: new FormControl(''),
      hasWhatsapp: new FormControl(''),
      telefone: new FormControl(''),
      profissao: new FormControl(''),
      cpf: new FormControl(''),
      endereco: new FormControl(''),
      complemento: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      experiencia: new FormControl(''),      
      cep: new FormControl('')
    });
  }

  /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
  salvar():void{

    let funcionario = this.formulario.value as Funcionario;

    /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
    this.funcionarioService.addFuncionario(funcionario)
      .subscribe(response => {

        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        let res: Response = <Response>response;

        /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
              E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.funcionario = new Funcionario();
          this.formulario.reset();
        }
        else {
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
