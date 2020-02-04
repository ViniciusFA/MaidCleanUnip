import { informacoesVaga } from './../../system-objects/informacoesVaga.model';
import { CamposPesquisaVaga } from './../../system-objects/camposPesquisaVaga-model';
import { Cidade } from './../../system-objects/cidade-model';
import { LocalidadeService } from './../../services/localidade/localidade.service';
import { Estado } from './../../system-objects/estado-model';
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
  pageOfItems: Array<any>;
  private todosCamposVazios: Boolean = false;
  private states: Array<Estado>;
  private cidades: Array<Cidade>;
  private selecione: String = 'Selecione';
  private camposPesq: CamposPesquisaVaga = new CamposPesquisaVaga();
  private estado: Estado = new Estado();
  private cidade: Cidade = new Cidade();
  private informacoesVaga:informacoesVaga = new informacoesVaga();


  constructor(private formBuilder: FormBuilder,
    private vagaService: VagaService,
    private router: Router,
    private localidadeService: LocalidadeService) {

    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = "Oportunidades";
    this.getAllOportunity();
    this.carregarCampos();
  }


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
      nomeEmpregador: new FormControl({ value: '', disabled: true }),
      estado: new FormControl(''),
      cidade: new FormControl({ value: '', disabled: true })
    });
  }

  carregarCampos() {
    this.getEstados();
  }

  onChangePage(pageOfItems: Array<any>) {
    //atualiza pagina de itens atual
    this.pageOfItems = pageOfItems;
  }

  getAllOportunity() {
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

   this.informacoesVaga.id_vaga = vaga.id;
   this.informacoesVaga.idEmpregador = vaga.idUsuario.idUsuario;
   this.informacoesVaga.subtitulo = vaga.subtitulo;
   this.informacoesVaga.titulo = vaga.titulo;
   this.informacoesVaga.estado = vaga.estado.nome_estado;
   this.informacoesVaga.cidade = vaga.cidade.nome_cidade;
   this.informacoesVaga.descricao = vaga.descricao;
   this.informacoesVaga.nomeEmpregador = vaga.idUsuario.nome;

   console.log(vaga);
   console.log(this.informacoesVaga);

    this.router.navigate(['oportunidade-modal'], { queryParams: this.informacoesVaga });
  }

  pesquisarVaga() {

    console.log(this.formulario.value);

    this.camposPesq.titulo = this.formulario.controls['titulo'].value;
    this.camposPesq.subtitulo = this.formulario.controls['subtitulo'].value;
    this.camposPesq.estado = this.formulario.controls['estado'].value;
    this.camposPesq.cidade = this.formulario.controls['cidade'].value;

    this.todosCamposVazios = this.verificaCamposVazio(this.camposPesq);

    console.log(this.camposPesq);

    if (this.todosCamposVazios) {
      alert("Preencha pelo menos um campo para pesquisar.");
      this.getAllOportunity();
    } else {

    if(this.camposPesq.titulo == null || this.camposPesq == undefined)
      this.camposPesq.titulo = "";

    if(this.camposPesq.subtitulo == null || this.camposPesq == undefined)
      this.camposPesq.subtitulo = "";

    if(this.camposPesq.estado == null || this.camposPesq == undefined)
      this.camposPesq.estado = "";

      if(this.camposPesq.cidade == null || this.camposPesq == undefined)
      this.camposPesq.cidade = "";

      this.vagaService.pesquisar(this.camposPesq)
        .subscribe(response => {
          console.log(response);
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

  verificaCamposVazio(camposPesquisa: CamposPesquisaVaga) {

    if ((camposPesquisa.titulo == "" || camposPesquisa.titulo == null ||
      camposPesquisa.titulo == undefined)
      && (camposPesquisa.subtitulo == "" || camposPesquisa.subtitulo == null ||
        camposPesquisa.subtitulo == undefined)
      //&& (camposPesquisa.nomeEmpregador == "" || camposPesquisa.nomeEmpregador == null )
      && (camposPesquisa.estado == "" || this.camposPesq.estado == null ||
        this.camposPesq.estado == undefined)
      && (camposPesquisa.cidade == "" || camposPesquisa.cidade == null ||
        camposPesquisa.cidade == undefined))
      return true
    else
      return false;
  }

  getEstados() {
    return this.localidadeService.getStates().subscribe(data => {
      this.states = data;
    })
  }

  getCities() {
    this.localidadeService.getCities().subscribe(data => {
      this.cidades = data;
    });
  }

  getCitiesWithIdState(id_estado: any) {
    if (id_estado == "Selecione" || id_estado == null || id_estado == undefined) {
      this.formulario.controls['cidade'].setValue("Selecione");
      this.formulario.controls['cidade'].disable();
    } else {
      this.localidadeService.getCitysWithIdStates(id_estado).subscribe(data => {
        this.cidades = data;
        console.log(this.cidades);
      });
      this.formulario.controls.cidade.enable();
    }
  }

}
