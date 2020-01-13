import { Component, OnInit } from '@angular/core';
import { Vaga } from '../../services/vaga/vaga';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Estados } from '../../util/estados';
import { Residencia } from '../../util/residencia';
import { VagaService } from '../../services/vaga/VagaService';
import { Router } from '@angular/router';
import { Response } from '../../services/response';

@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.component.html'
})
export class OportunidadesComponent implements OnInit {

  private vagas: Vaga[] = new Array();
  private titulo: string;
  private formulario: FormGroup;
  private vaga: Vaga = new Vaga();
  private listaParametros: String[] = new Array();
  pageOfItems:Array<any>;
  private todosCamposVazios:Boolean = false;


  constructor(private formBuilder: FormBuilder,
    private vagaService: VagaService,
    private router: Router) {

    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = "Oportunidades";
    this.getAllOportunity();
  }

  estados = [
    new Estados(0, 'Selecione'),
    new Estados(1, 'RJ'),
    new Estados(2, 'SP'),
    new Estados(3, 'BA'),
  ];

  residencias = [
    new Residencia(0, 'Selecione'),
    new Residencia(1, 'Apartamento'),
    new Residencia(2, 'Casa'),
  ];

  experiencias = [
    new Residencia(0, 'Selecione'),
    new Residencia(1, '+6 meses'),
    new Residencia(2, '+1 ano'),
  ];


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      titulo: new FormControl(''),
      subtitulo: new FormControl(''),
      nomeEmpregador: new FormControl({value:'',disabled: true}),
      estado: new FormControl(''),
      cidade: new FormControl('')
    });
  }

  onChangePage(pageOfItems: Array<any>){
    //atualiza pagina de itens atual
    this.pageOfItems = pageOfItems;
  }

  getAllOportunity(){
    this.vagaService.getVagas().subscribe(res => this.vagas = res);
  }

  limparCampos() {
    this.formulario.controls['titulo'].setValue("");
    this.formulario.controls['subtitulo'].setValue("");
   // this.formulario.controls['nomeEmpregador'].setValue("");
    this.formulario.controls['estado'].setValue("");
    this.formulario.controls['cidade'].setValue("");
    (<HTMLSelectElement>document.getElementById('campoEstadoOportunidades')).value = "Selecione";
   }

  oportunidadeInfo(vaga: Vaga) {
    this.vaga.id = vaga.id;
    this.vaga.idEmpregador = vaga.idUsuario.idUsuario;
    this.vaga.id = vaga.id;
    this.vaga.telefone = vaga.idUsuario.telefone;
    this.vaga.subtitulo = vaga.subtitulo;
    this.vaga.titulo = vaga.titulo;    
    this.vaga.estado = vaga.estado;
    this.vaga.cidade = vaga.cidade;
    this.vaga.descricao = vaga.descricao;

    this.router.navigate(['oportunidade-modal'], { queryParams: this.vaga });
  }

  pesquisarVaga() {

    this.vaga = this.formulario.value;

    this.todosCamposVazios = this.verificaCamposVazio(this.vaga);
    
    if(this.todosCamposVazios){      
      alert("Preencha pelo menos um campo para pesquisar.");   
      this.getAllOportunity();
    }else{
    this.vagaService.pesquisar(this.vaga)
      .subscribe(response => {
        if (response == 0) {
          alert("Não há registros dessa pesquisa.");
        } else {
          this.vagas = response;
        }
      },
        (erro) => {
          alert(erro);
        });
      }
  }

  verificaCamposVazio(camposPesquisa:Vaga){

    if((camposPesquisa.titulo == "" || camposPesquisa.titulo == null)
    && (camposPesquisa.subtitulo == "" || camposPesquisa.subtitulo == null) 
    //&& (camposPesquisa.nomeEmpregador == "" || camposPesquisa.nomeEmpregador == null )
    && (camposPesquisa.estado == "" || camposPesquisa.estado == null)
    && (camposPesquisa.cidade == "" || camposPesquisa.cidade == null))    
      return true
    else
      return false;
  }

}
