﻿import { Usuario } from './../../system-objects/usuario-model';
import { RoleEnum } from './../../system-objects/role-enum';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Funcionario } from '../../services/funcionario/funcionario';
import { Response } from '../../services/response';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Estados } from '../../util/estados';
import { Experiencia } from '../../util/experiencia';
import { Sexo } from '../../util/sexo';
import { PesquisaFuncionarioService } from '../../services/Pesquisa/PesquisaFuncionarioService';
import { PesquisaFuncionario } from '../../services/Pesquisa/PesquisaFuncionario';
import { InfoFuncionarioComponent } from '../info-funcionario/info-funcionario.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html'
})
export class PesquisarComponent implements OnInit {
    
  private usuarios: Usuario[] = new Array();
  private usuariosFuncionarios: Usuario[] = new Array();
  private titulo: string;
  private formulario: FormGroup;
  private pesquisaFuncionario: PesquisaFuncionario = new PesquisaFuncionario();
  private usuarioFuncionario: Usuario = new Usuario();
  private inforFuncionario: InfoFuncionarioComponent; 
 
  constructor(private usuarioService: UsuarioService,
              private formBuilder:FormBuilder,
              private pesquisaFuncionarioService:PesquisaFuncionarioService,
              private router:Router
              ) {

              this.configurarFormulario();
    }

  ngOnInit() {
    this.titulo = "Pesquisar Funcionários";

    //busca todas as pessoas registradas na tabela ao iniciar a página.
    this.usuarioService.getUsuarioPorPerfil(RoleEnum.Funcionario).subscribe(res => {
      this.usuarios = res;
    }); 
  }

    estados = [
      new Estados(0, "Selecione"),
      new Estados(1, 'Rio de Janeiro'),
      new Estados(2, 'São Paulo'),
    ];

    experiencias = [
      new Experiencia(0, "Seleicone"),
      new Experiencia(1, 'Sem Experiência'),
      new Experiencia(1, ' 1 a 6 meses'),
      new Experiencia(1, ' 6 a 12 meses'),
      new Experiencia(1, ' 1 a 2 anos'),
    ];

    sexos = [
      new Sexo(0,"Selecione"),
      new Sexo(1, 'Feminino'),
      new Sexo(2, 'Masculino'),
    ];

    configurarFormulario(){
      this.formulario = this.formBuilder.group({
        nome:new FormControl('',[Validators.minLength(3),Validators.maxLength(15)]),
        sobrenome:new FormControl('',[Validators.minLength(3),Validators.maxLength(40)]),
        estado:new FormControl(''),
        cidade:new FormControl('',Validators.maxLength(15)),
        sexo:new FormControl(''),
        experiencia:new FormControl('')
      });
    }
  
    limparCampos(){
      (<HTMLSelectElement>document.getElementById('campoNomeVagas')).value = "";
      (<HTMLSelectElement>document.getElementById('campoSobreNomeVagas')).value = "";
      (<HTMLSelectElement>document.getElementById('campoEstadoVagas')).value = "Estado";
      (<HTMLSelectElement>document.getElementById('campoCidadeVagas')).value = ""; 
      (<HTMLSelectElement>document.getElementById('campoSexoVagas')).value = "Sexo"; 
      (<HTMLSelectElement>document.getElementById('campoExperienciaVagas')).value = "Experiência";      
    }

    pesquisar(){   
     this.usuarioFuncionario = this.formulario.value ;

      this.pesquisaFuncionarioService.buscar(this.usuarioFuncionario)
      .subscribe(response =>{
        if(response == 0 ){
          alert("Não há registros dessa pesquisa.");
        }else{         
            //recebe a resposta do back end e atualiza a tabela de funcionários
            this.usuarios = response;
        }      
    },
        (erro)=> {
          alert(erro);
      });
      }
    //}

    /**EXCLUI UM REGISTRO QUANDO CLICAMOS NA OPÇÃO EXCLUIR DE UMA 
     * LINHA DA TABELA*/
    excluir(codigo:number, index:number):void{
      if(confirm("Deseja realmente excluir esse funcionário?")){

        /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
        this.usuarioService.deleteUsuario(codigo).subscribe(response =>{

        /**PEGA O RESPONSE DO SERVIÇO */
        let res:Response = <Response>response;
        
        /*1 = SUCESSO
              * MOSTRAMOS A MENSAGEM RETORNADA PELO SERVIÇO E DEPOIS REMOVEMOS
              O REGISTRO DA TABELA HTML*/
              if(res.codigo == 1){
                alert(res.mensagem);
                this.usuarios.splice(index,1);
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

    infoFuncionario(funcionario:Funcionario){
      console.log(funcionario);
      this.router.navigate(['infoFuncionario'],{queryParams: funcionario});
    }
    
}
