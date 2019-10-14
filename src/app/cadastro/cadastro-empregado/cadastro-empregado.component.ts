
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Funcionario } from '../../services/funcionario/funcionario';
import { Response } from '../../services/response';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Estados } from 'src/app/util/estados';
import { Sexo } from 'src/app/util/sexo';

@Component({
  selector: 'app-cadastro-empregado',
  templateUrl: './cadastro-empregado.component.html'
})
export class CadastroEmpregadoComponent implements OnInit {

  private titulo: string;
  private subtitulo:string;
  private funcionario:Funcionario = new Funcionario();
  private formulario: FormGroup;
  private valorInteiro: Number = null;

  constructor(private funcionarioService: FuncionarioService,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder) {

                this.configurarFormulario();
              }
          
  ngOnInit() {
    this.subtitulo="Funcionário";  
  }

  estados = [
    new Estados(0, 'Estados'),
    new Estados(1, 'Rio de Janeiro'),
    new Estados(2, 'São Paulo'),
  ];

  sexos = [
    new Sexo(0, 'Sexo'),
    new Sexo(1, 'Feminino'),
    new Sexo(2, 'Masculino'),
  ];

  configurarFormulario(){
    this.formulario = this.formBuilder.group({

      nome: new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
      sobrenome: new FormControl('',[Validators.minLength(5),Validators.maxLength(40)]),
      login: new FormControl('',[Validators.required, Validators.minLength(5),Validators.maxLength(10)]),
      senha: new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(8)]),
      sexo: new FormControl(''),
      email: new FormControl('',Validators.email),
      urlFacebook: new FormControl('',Validators.maxLength(80)),
      hasWhatsapp: new FormControl((false)),
      telefone: new FormControl('',Validators.maxLength(13)),
      profissao: new FormControl('',Validators.maxLength(80)),
      cpf: new FormControl('',[Validators.minLength(11),Validators.maxLength(11)]),
      endereco: new FormControl('',Validators.maxLength(100)),
      complemento: new FormControl('',Validators.maxLength(15)),
      cidade: new FormControl('',Validators.maxLength(15)),
      estado: new FormControl(''),
      experiencia: new FormControl('',Validators.maxLength(35)),      
      cep: new FormControl('',Validators.maxLength(13))
    });
  }

  /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
  salvar():void{
    
    //populando o objeto funcionario através dos valores recebidos no reactiveforms
    let funcionario = this.formulario.value as Funcionario;

    //Convertendo o valor da opção(string) para boolean
    this.valorInteiro = this.formulario.value.hasWhatsapp
    if(this.valorInteiro == 1){
     funcionario.hasWhatsapp = true;
    }else{
      funcionario.hasWhatsapp = false;
    }

    //Convertendo o valor da opção(string) para boolean
    this.valorInteiro = this.formulario.value.sexo;    
    if(this.valorInteiro == 1){
      funcionario.sexo = true;
     }else{
       funcionario.sexo = false;
     }

     //convertendo o valor da opção (string) para inteiro
    funcionario.estado = parseInt (this.formulario.value.estado);


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
            EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API*/
          alert(erro);
        });    
  }
}
