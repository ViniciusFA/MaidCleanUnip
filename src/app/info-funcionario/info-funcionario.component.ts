import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Funcionario } from '../services/funcionario/funcionario';
import { FuncionarioService } from '../services/funcionario/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '../services/response';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-funcionario',
  templateUrl: './info-funcionario.component.html'
})
export class InfoFuncionarioComponent implements OnInit {
  private titulo:string;
  private funcionarioInfo:Funcionario =new Funcionario();
  private formulario:FormGroup;
  private edicao:Boolean = true;
  private funcionarioInfoNovo:Funcionario = new Funcionario();

 
  @ViewChild('confirmExcluir',{static:false}) confirmExcluir:ElementRef;
  @ViewChild('btnEdicao', {static:false}) btnEdicao;

  constructor(private activatedRoute: ActivatedRoute,
              private funcionarioService:FuncionarioService,
              private router:Router,
              private formBuilder:FormBuilder){             
               this.configurarCampos();

              }

  ngOnInit() {    
    this.titulo = "Informação Funcionário"; 
    this.recebendoParamsFuncionario();
    
  }

  //recebe os dados no formulario inserido pelo usuário
  configurarCampos(){
    this.formulario = this.formBuilder.group({
      nome: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
      sobrenome: new FormControl({value: '', disabled: true}, [Validators.minLength(3),Validators.maxLength(40)]),
      email: new FormControl({value: '', disabled: true}, [Validators.email, Validators.maxLength(50)]),
      facebook:  new FormControl({value: '', disabled: true},[Validators.maxLength(80)]),
      whatsapp:  new FormControl({value: '', disabled: true},Validators.maxLength(3)),
      telefone:  new FormControl({value: '', disabled: true},[Validators.maxLength(13)]),
      profissao:  new FormControl({value: '', disabled: true},[Validators.maxLength(40)]),  
      experiencia:  new FormControl({value: '', disabled: true},[Validators.maxLength(35)]),
      cpf: new FormControl({value: '', disabled: true},[Validators.maxLength(11)]),
      endereco: new FormControl({value: '', disabled: true},[Validators.maxLength(100)]),
      complemento: new FormControl({value: '', disabled: true},[Validators.maxLength(15)]),
      cidade: new FormControl({value: '', disabled: true},[Validators.maxLength(15)]),
      estado: new FormControl({value: '', disabled: true},[Validators.maxLength(30)]),
      cep: new FormControl({value: '', disabled: true},[Validators.maxLength(13)]),
      avaliacao:  new FormControl({value: '', disabled: true},[Validators.maxLength(2)]),
      sexo:  new FormControl({value: '', disabled: true},[Validators.maxLength(9)]),
    });
  }

   //método que captura o funcionário selecionado no badge info da página pesquiasr
   recebendoParamsFuncionario(){
   //recebendo os valores vindo da router através do queryParams
   this.funcionarioInfo.id = this.activatedRoute.snapshot.queryParams.id;
   this.funcionarioInfo.nome = this.activatedRoute.snapshot.queryParams.nome;
   this.funcionarioInfo.sobrenome = this.activatedRoute.snapshot.queryParams.sobrenome;
   this.funcionarioInfo.email = this.activatedRoute.snapshot.queryParams.email;
   this.funcionarioInfo.cpf = this.activatedRoute.snapshot.queryParams.cpf;
   this.funcionarioInfo.endereco = this.activatedRoute.snapshot.queryParams.endereco;
   this.funcionarioInfo.complemento = this.activatedRoute.snapshot.queryParams.complemento;
   this.funcionarioInfo.cidade = this.activatedRoute.snapshot.queryParams.cidade;
   this.funcionarioInfo.estado = this.activatedRoute.snapshot.queryParams.estado;
   this.funcionarioInfo.cep = this.activatedRoute.snapshot.queryParams.cep;
   this.funcionarioInfo.sexo = this.activatedRoute.snapshot.queryParams.sexo;
   this.funcionarioInfo.telefone = this.activatedRoute.snapshot.queryParams.telefone;
   this.funcionarioInfo.profissao = this.activatedRoute.snapshot.queryParams.profissao;
   
   //se o campo urlFacebbok estiver null ou vazio receberá um texto personalizado
   if(this.funcionarioInfo.urlFacebook == undefined ||
     this.funcionarioInfo.urlFacebook == "" ||
     this.funcionarioInfo.urlFacebook == null){
     this.funcionarioInfo.urlFacebook =  "Não cadastrou facebook.";
   }else{
     this.funcionarioInfo.urlFacebook = this.activatedRoute.snapshot.queryParams.urlFacebook;
   }   
    //se o campo hasWhatsapp estiver null ou vazio receberá um texto personalizado
   if(this.activatedRoute.snapshot.queryParams.hasWhatsapp == undefined ||
     this.activatedRoute.snapshot.queryParams.hasWhatsapp == "" ||
     this.activatedRoute.snapshot.queryParams.hasWhatsapp == null){
    this.funcionarioInfo.urlFacebook =  "Não cadastrou whatsapp.";
   }else{
    this.funcionarioInfo.hasWhatsapp = this.activatedRoute.snapshot.queryParams.hasWhatsapp;
   }
    //se o campo experiencia estiver null ou vazio receberá um texto personalizado
   if(this.activatedRoute.snapshot.queryParams.experiencia == undefined ||
      this.activatedRoute.snapshot.queryParams.experiencia == "" ||
      this.activatedRoute.snapshot.queryParams.experiencia == null){
        this.funcionarioInfo.experiencia = "Não foi cadastrado experiência.";
    }else{
      this.funcionarioInfo.experiencia = this.activatedRoute.snapshot.queryParams.experiencia;
    }  
   //se o campo avaliacao estiver null ou vazio receberá um texto personalizado
   if(this.activatedRoute.snapshot.queryParams.avaliacao == undefined ||
      this.activatedRoute.snapshot.queryParams.avaliacao == "" ||
      this.activatedRoute.snapshot.queryParams.avaliacao == null){
      this.funcionarioInfo.avaliacao = "Ainda não possui avaliação.";
   }else{
     this.funcionarioInfo.avaliacao = this.activatedRoute.snapshot.queryParams.avaliacao;
   }  

  }

  //Exclui um funcionário ao clicar no botão excluir
  excluir(funcionarioInfo:Funcionario){
    this.funcionarioService.deleteFuncionario(funcionarioInfo.id)
    .subscribe(response => {
      let res: Response = <Response>response;
      if(res.codigo == 1){
        alert(res.mensagem);
        this.router.navigate(['pesquisar']);
        this.confirmExcluir.nativeElement.click();
        
      }else{
        alert(res.mensagem);
      }
    },
    (erro) => {
      alert(erro);
    });
  }

  //Habilitando edição dos campos após clicar no badge Editar
  habilitarEdicao(inputEscolhido: String){
   if(inputEscolhido == this.funcionarioInfo.nome){
    this.formulario.controls['nome'].enable();

   }
   if(inputEscolhido == this.funcionarioInfo.sobrenome){
    this.formulario.controls['sobrenome'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.email){
    this.formulario.controls['email'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.urlFacebook){
    this.formulario.controls['urlFacebook'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.hasWhatsapp){
    this.formulario.controls['hasWhatsapp'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.telefone){
    this.formulario.controls['telefone'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.profissao){
    this.formulario.controls['profissao'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.experiencia){
    this.formulario.controls['experiencia'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.cpf){
    this.formulario.controls['cpf'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.endereco){
    this.formulario.controls['endereco'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.complemento){
    this.formulario.controls['complemento'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.cidade){
    this.formulario.controls['cidade'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.estado){
    this.formulario.controls['estado'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.cep){
    this.formulario.controls['cep'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.avaliacao){
    this.formulario.controls['avaliacao'].enable();
   }
   if(inputEscolhido == this.funcionarioInfo.sexo){
    this.formulario.controls['sexo'].enable();
   }   
   //habilita o botão para alterar a informação do funcionário.
  this.edicao = false;
  }

 
  atualizar(funcionarioInfoNovo: Funcionario){
      
     funcionarioInfoNovo = this.formulario.value;

      //for(let i:Funcionario in this.funcionarioInfo){
        //if(i == funcionarioInfoNovo){
        //}
      //}

      console.log(funcionarioInfoNovo);
      console.log(this.funcionarioInfo);

    this.edicao = false;
    //this.router.navigate(['pesquisar']);
    }
  }


