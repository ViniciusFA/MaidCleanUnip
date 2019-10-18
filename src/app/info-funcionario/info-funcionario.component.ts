import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Funcionario } from '../services/funcionario/funcionario';
import { FuncionarioService } from '../services/funcionario/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '../services/response';

@Component({
  selector: 'app-info-funcionario',
  templateUrl: './info-funcionario.component.html'
})
export class InfoFuncionarioComponent implements OnInit {
  private titulo:string;
  private funcionarioInfo:Funcionario =new Funcionario();
 
  @ViewChild('confirmExcluir',{static:false}) confirmExcluir:ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private funcionarioService:FuncionarioService,
              private router:Router){
              }

  ngOnInit() {
    
    this.titulo = "Informação Funcionário"; 
    this.recebendoParamsFuncionario();
  }

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

}