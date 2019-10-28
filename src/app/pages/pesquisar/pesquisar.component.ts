import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Funcionario } from '../../services/funcionario/funcionario';
import { Response } from '../../services/response';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Estados } from '../../util/estados';
import { Experiencia } from '../../util/experiencia';
import { Sexo } from '../../util/sexo';
import { PesquisaFuncionarioService } from '../../services/Pesquisa/PesquisaFuncionarioService';
import { PesquisaFuncionario } from '../../services/Pesquisa/PesquisaFuncionario';
import { Http } from '@angular/http';
import { InfoFuncionarioComponent } from '../info-funcionario/info-funcionario.component';


@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html'
})
export class PesquisarComponent implements OnInit {
  
  private funcionarios: Funcionario[] = new Array();
  private titulo:string;
  private formulario:FormGroup;  
  private pesquisaFuncionario:PesquisaFuncionario = new PesquisaFuncionario();
  private funcionario:Funcionario = new Funcionario(); 
  private inforFuncionario:InfoFuncionarioComponent ; 

  constructor(private funcionarioService: FuncionarioService,
              private formBuilder:FormBuilder,
              private pesquisaFuncionarioService:PesquisaFuncionarioService,
              private router:Router
              ) {

              this.configurarFormulario();
    }

  ngOnInit(){
    this.titulo = "Pesquisar Funcionários";
    //busca todas as pessoas registradas na tabela ao iniciar a página.
    this.funcionarioService.getFuncionarios().subscribe(res => this.funcionarios = res);    
    }

    estados = [
      new Estados(0, 'Estado'),
      new Estados(1, 'Rio de Janeiro'),
      new Estados(2, 'São Paulo'),
    ];

    experiencias = [
      new Experiencia(0, 'Experiência'),
      new Experiencia(1, 'Sem Experiência'),
      new Experiencia(1, ' 1 a 6 meses'),
      new Experiencia(1, ' 6 a 12 meses'),
      new Experiencia(1, ' 1 a 2 anos'),
    ];

    sexos = [
      new Sexo(0,'Sexo'),
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
     this.funcionario = this.formulario.value ;

      //Verifia se há campo preenchido para pesquisa
      if(    this.funcionario.nome == "" || this.funcionario.nome  == null 
          && this.funcionario.sobrenome == "" || this.funcionario.sobrenome == null
          && this.funcionario.estado == "" || this.funcionario.estado == null
          && this.funcionario.cidade == "" || this.funcionario.cidade == null
          && this.funcionario.sexo == "" || this.funcionario.sexo == null
          && this.funcionario.experiencia == "" || this.funcionario.experiencia == null){
            alert("Preencha pelo menos um campo para pesquisar.");
            //busca todas as pessoas registradas na tabela.
            this.funcionarioService.getFuncionarios().subscribe(res => this.funcionarios = res);
      }else{   
       
      this.pesquisaFuncionarioService.buscar(this.funcionario)
      .subscribe(response =>{
        if(response.length == 0 ){
          alert("Não há registros dessa pesquisa.");
        }else{         
            //recebe a resposta do back end e atualiza a tabela de funcionários
            this.funcionarios = response;
        }      
    },
        (erro)=> {
          alert(erro);
      });
      }
    }

    /**EXCLUI UM REGISTRO QUANDO CLICAMOS NA OPÇÃO EXCLUIR DE UMA 
     * LINHA DA TABELA*/
    excluir(codigo:number, index:number):void{
      if(confirm("Deseja realmente excluir esse funcionário?")){

        /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
        this.funcionarioService.deleteFuncionario(codigo).subscribe(response =>{

        /**PEGA O RESPONSE DO SERVIÇO */
        let res:Response = <Response>response;
        
        /*1 = SUCESSO
              * MOSTRAMOS A MENSAGEM RETORNADA PELO SERVIÇO E DEPOIS REMOVEMOS
              O REGISTRO DA TABELA HTML*/
              if(res.codigo == 1){
                alert(res.mensagem);
                this.funcionarios.splice(index,1);
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
      this.router.navigate(['infoFuncionario'],{queryParams: funcionario});
    }
    
}
