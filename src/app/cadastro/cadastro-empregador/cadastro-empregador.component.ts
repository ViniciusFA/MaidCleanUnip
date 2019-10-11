import { Component, OnInit, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpregadorService } from '../../services/empregador/empregador.service';
import { Empregador } from 'src/app/services/empregador/empregador';
import { Response } from '../../services/response';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-cadastro-empregador',
  templateUrl: './cadastro-empregador.component.html'
})
export class CadastroEmpregadorComponent implements OnInit {

  empregador: Empregador = new Empregador();
  formulario: FormGroup;
  private valorInteiro: Number = null;

  constructor(private empregadorService: EmpregadorService,
              private router: Router,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
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
      residencia: this.formBuilder.control(''),
      cnpj: this.formBuilder.control(''),
      endereco: this.formBuilder.control(''),
      complemento: this.formBuilder.control(''),
      cidade: this.formBuilder.control(''),
      estado: this.formBuilder.control(''),
      cep: this.formBuilder.control('')
    });
  }

  cadastrar():void{
    this.empregador = new Empregador();
  }

  salvar(){

    let empregador = this.formulario.value as Empregador;

    //convertendo value do option(string) para inteiro
    empregador.estado= parseInt (this.formulario.value.estado);

    //Convertendo o valor da opção(string) para boolean
    this.valorInteiro = this.formulario.value.sexo;    
    if(this.valorInteiro == 1){
        empregador.sexo = true;
      }else{
       empregador.sexo = false;
      }

    //convertendo value do option(string) para inteiro
    empregador.cnpj= parseInt (this.formulario.value.cnpj);

     //convertendo value do option(string) para inteiro
     empregador.cep= parseInt (this.formulario.value.cep);

     //convertendo value do option(string) para inteiro
     empregador.telefone= parseInt (this.formulario.value.telefone);

     //Convertendo o valor da opção(string) para boolean
    this.valorInteiro = this.formulario.value.hasWhatsapp;    
    if(this.valorInteiro == 1){
        empregador.hasWhatsapp = true;
      }else{
       empregador.hasWhatsapp = false;
      }

    this.empregadorService.criarEmpregador(empregador)
                          .subscribe(response=> {
      let res:Response = <Response>response;
      
      if(res.codigo == 1){
        alert(res.mensagem);
        this.empregador = new Empregador();   
      }else{
        alert(res.mensagem);
      }
    }
    ,(erro) =>{
      alert(erro);  
    });  
    this.formulario.reset();  
  }

  voltar():void{
    this.router.navigate(['/cadastro']);
  }

}
