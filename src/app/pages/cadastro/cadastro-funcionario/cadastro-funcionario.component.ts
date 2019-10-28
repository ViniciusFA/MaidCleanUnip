import { RoleEnum } from './../../../system-objects/role-enum';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Usuario } from './../../../system-objects/usuario-model';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario/funcionario.service';
import { Funcionario } from '../../../services/funcionario/funcionario';
import { Response } from '../../../services/response';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Estados } from 'src/app/util/estados';
import { Sexo } from 'src/app/util/sexo';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html'
})
export class CadastroFuncionarioComponent implements OnInit {

  private titulo: string;
  private subtitulo:string;
  private usuario:Usuario = new Usuario();
  private formulario: FormGroup;
  private valorInteiro: Number = null;

  constructor(private UsuarioService: UsuarioService,
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
      sobrenome: new FormControl('',[Validators.minLength(3),Validators.maxLength(40)]),
      login: new FormControl('',[Validators.required, Validators.minLength(5),Validators.maxLength(10)]),
      senha: new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(8)]),
      sexo: new FormControl(''),
      email: new FormControl('',Validators.email),
      urlFacebook: new FormControl('',Validators.maxLength(80)),
      hasWhatsapp: new FormControl((false)),
      telefone: new FormControl('',Validators.maxLength(13)),
      profissao: new FormControl('',Validators.maxLength(80)),
      cpf_cnpj: new FormControl('',[Validators.minLength(11),Validators.maxLength(11)]),
      endereco: new FormControl('',Validators.maxLength(100)),
      complemento: new FormControl('',Validators.maxLength(15)),
      cidade: new FormControl('',Validators.maxLength(15)),
      estado: new FormControl(''),     
      experiencia: new FormControl('',Validators.maxLength(35)),      
      cep: new FormControl('',Validators.maxLength(13))
    });
  }


  salvar():void{

    let usuario = this.formulario.value as Usuario;

    if(usuario.sexo = "Masculino"){
      usuario.sexo = 'M';
    }else {
      usuario.sexo = 'F'
    }
    usuario.id_role = RoleEnum.Funcionario;

    console.log(usuario);
    this.UsuarioService.addUsuario(usuario)
      .subscribe(response => {

        let res: Response = <Response>response;

        if (res.codigo == 1) {
          alert(res.mensagem);
          this.usuario = new Usuario();
          this.formulario.reset();
          this.router.navigate(['pesquisar']);
        }
        else {
          alert(res.mensagem);
        }
      },
        (erro) => {
          alert(erro);
        });    
  }
}
