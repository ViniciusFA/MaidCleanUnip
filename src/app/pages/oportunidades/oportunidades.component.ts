import { ExperienciaService } from './../../services/experienciaService/experiencia.service';
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
  pageOfItems: Array<any>[] = new Array();
  private todosCamposVazios: Boolean = false;
  private states: Array<Estado> = new Array();
  private cidades: Array<Cidade> = new Array();
  private selecione: String = 'Selecione';
  private camposPesq: CamposPesquisaVaga = new CamposPesquisaVaga();
  private experiencias: Array<String> = new Array();
  private estado: Estado = new Estado();
  private cidade: Cidade = new Cidade();
  private informacoesVaga: informacoesVaga = new informacoesVaga();



  constructor(private formBuilder: FormBuilder,
    private vagaService: VagaService,
    private router: Router,
    private localidadeService: LocalidadeService,
    private experienciaService: ExperienciaService) {

    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = "Oportunidades";
    this.carregarCampos();
  }

  residencias = [
    new Residencia(0, 'Selecione'),
    new Residencia(1, 'Apartamento'),
    new Residencia(2, 'Casa'),
  ];

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      titulo: new FormControl(''),
      subtitulo: new FormControl(''),
      experiencia: new FormControl('Selecione'),
      estado: new FormControl(''),
      cidade: new FormControl({ value: 'Selecione', disabled: true })
    });
  }

  carregarCampos() {    
    this.getEstados();
    this.getExperiences();
    this.getAllOportunity();
  }

  //onChangePage(pageOfItems: Array<any> ) {
    onChangePage(pageOfItems: Array<any> ) {
    this.pageOfItems = pageOfItems;
    console.log(this.pageOfItems);
  }

  getAllOportunity() {
    this.vagaService.getVagas().subscribe(res => {
     this.vagas = res
     //this.pageOfItems = res;
    });
  }

  limparCampos() {
    this.formulario.controls['titulo'].setValue("");
    this.formulario.controls['subtitulo'].setValue("");
    this.formulario.controls['experiencia'].setValue("");
    this.formulario.controls['estado'].setValue("");
    this.formulario.controls['cidade'].setValue("");
    (<HTMLSelectElement>document.getElementById('campoEstadoOportunidades')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoExperienciaOportunidades')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoCidadeOportunidades')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoCidadeOportunidades')).disabled = true;    
  }

  oportunidadeInfo(vaga: Vaga) {

    console.log(vaga);

    this.informacoesVaga.id_vaga = vaga.id;
    this.informacoesVaga.idEmpregador = vaga.usuario.idUsuario;
    this.informacoesVaga.subtitulo = vaga.subtitulo;
    this.informacoesVaga.titulo = vaga.titulo;
    this.informacoesVaga.estado = vaga.estado.nome_estado;
    this.informacoesVaga.cidade = vaga.cidade.nome_cidade;
    this.informacoesVaga.descricao = vaga.descricao;
    this.informacoesVaga.nomeEmpregador = vaga.usuario.nome;
    this.informacoesVaga.tempoExperiencia = vaga.experiencia.tempo;

    console.log(this.informacoesVaga);
    this.router.navigate(['oportunidade-modal'], { queryParams: this.informacoesVaga });
  }

  pesquisarVaga() {
    this.camposPesq.titulo = this.formulario.controls['titulo'].value;
    this.camposPesq.subtitulo = this.formulario.controls['subtitulo'].value;
    this.camposPesq.estado = this.formulario.controls['estado'].value;
    this.camposPesq.cidade = this.formulario.controls['cidade'].value;
    this.camposPesq.experiencia = this.formulario.controls['experiencia'].value;

    this.todosCamposVazios = this.verificaCamposVazio(this.camposPesq);

    if (this.todosCamposVazios) {
      alert("Preencha pelo menos um campo para pesquisar.");
      this.getAllOportunity();
    } else {
      if (this.camposPesq.titulo == null || this.camposPesq == undefined)
        this.camposPesq.titulo = "";

      if (this.camposPesq.subtitulo == null || this.camposPesq == undefined)
        this.camposPesq.subtitulo = "";

      if (this.camposPesq.experiencia == null || this.camposPesq == undefined
          || this.camposPesq.experiencia == "Selecione")
        this.camposPesq.experiencia = "";

      if (this.camposPesq.estado == null || this.camposPesq.estado == undefined
         || this.camposPesq.estado == "Selecione")
        this.camposPesq.estado = "";

      if (this.camposPesq.cidade == null || this.camposPesq.cidade == undefined
        || this.camposPesq.cidade == "Selecione")
        this.camposPesq.cidade = "";

      this.vagaService.pesquisar(this.camposPesq)
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

  verificaCamposVazio(camposPesquisa: CamposPesquisaVaga) {

    if ((camposPesquisa.titulo == "" || camposPesquisa.titulo == null ||
      camposPesquisa.titulo == undefined)
      && (camposPesquisa.subtitulo == "" || camposPesquisa.subtitulo == null ||
        camposPesquisa.subtitulo == undefined)
      && (camposPesquisa.experiencia == "" || camposPesquisa.experiencia == null ||
        camposPesquisa.experiencia == undefined || camposPesquisa.experiencia == "Selecione")
      && (camposPesquisa.estado == "" || this.camposPesq.estado == null ||
        this.camposPesq.estado == undefined) || camposPesquisa.estado == "Selecione"
      && (camposPesquisa.cidade == "" || camposPesquisa.cidade == null ||
        camposPesquisa.cidade == undefined || camposPesquisa.cidade == "Selecione"))
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
      });
      this.formulario.controls.cidade.enable();
    }
  }

  getExperiences() {
    this.experienciaService.getExperiences().subscribe(data => {
      this.experiencias = data;
    })
  }

}
