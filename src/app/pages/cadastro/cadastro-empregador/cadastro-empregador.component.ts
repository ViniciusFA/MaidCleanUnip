import { Component, OnInit, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { Empregador } from 'src/app/services/empregador/empregador';
import { Response } from '../../../services/response';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Sexo } from 'src/app/util/sexo';
import { Estados } from 'src/app/util/estados';
import { Residencia } from 'src/app/util/residencia';

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

  residencias = [
    new Residencia(0, 'Residência'),
    new Residencia(1, 'Apartamento'),
    new Residencia(2, 'Casa'),
  ];

  configurarFormulario(){
    this.formulario = this.formBuilder.group({

      nome:this.formBuilder.control('',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      sobrenome: this.formBuilder.control('',[Validators.minLength(3),Validators.maxLength(40)]),
      login: this.formBuilder.control('',[Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
      senha: this.formBuilder.control('',[Validators.required, Validators.minLength(6),Validators.maxLength(8)]),
      avaliacao: this.formBuilder.control('',[Validators.email,Validators.maxLength(50)]),
      sexo: this.formBuilder.control(''),
      email: this.formBuilder.control('',[Validators.email,Validators.maxLength(50)]),
      telefone: this.formBuilder.control('',Validators.maxLength(13)),
      residencia: this.formBuilder.control(''),
      cnpj: this.formBuilder.control('',Validators.maxLength(20)),
      endereco: this.formBuilder.control('',Validators.maxLength(100)),
      complemento: this.formBuilder.control('',Validators.maxLength(40)),
      cidade: this.formBuilder.control('',Validators.maxLength(30)),
      estado: this.formBuilder.control(''),
      cep: this.formBuilder.control('',Validators.maxLength(8))
    });
  }

  cadastrar():void{
    this.empregador = new Empregador();
  }

  salvar(){

    let empregador = this.formulario.value as Empregador;

    this.empregadorService.criarEmpregador(empregador)
                          .subscribe(response=> {
      let res:Response = <Response>response;
      
      if(res.codigo == 1){
        alert(res.mensagem);
        this.formulario.reset();   
      }else{
        alert(res.mensagem);
      }
    }
    ,(erro) =>{
      alert(erro);  
    });      
  }

  voltar():void{
    this.router.navigate(['/cadastro']);
  }

}
