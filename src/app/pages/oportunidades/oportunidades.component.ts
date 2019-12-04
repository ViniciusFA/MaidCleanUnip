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

  constructor(private formBuilder: FormBuilder,
    private vagaService: VagaService,
    private router: Router) {

    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = "Oportunidades";
    this.vagaService.getVagas().subscribe(res => this.vagas = res);
  }

  estados = [
    new Estados(0, 'Selecione'),
    new Estados(1, 'Rio de Janeiro'),
    new Estados(2, 'São Paulo'),
    new Estados(3, 'Bahia'),
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
      nomeEmpregador: new FormControl(''),
      estado: new FormControl(''),
      cidade: new FormControl('')
    });
  }

  limparCampos() {
    (<HTMLSelectElement>document.getElementById('campoTitulo')).value = "";
    (<HTMLSelectElement>document.getElementById('campoSubTitulo')).value = "";
    (<HTMLSelectElement>document.getElementById('campoNome')).value = "";
    (<HTMLSelectElement>document.getElementById('campoEstadoOportunidades')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoCidade')).value = "";  
    }

  oportunidadeInfo(vaga: Vaga) {
    this.router.navigate(['oportunidade-modal'], { queryParams: vaga });
  }

  pesquisarVaga() {

    this.vaga = this.formulario.value;

    let todosCamposVazios:Boolean = this.verificaCamposVazio(this.vaga);
    
    if(todosCamposVazios == true){      
      alert("Preencha pelo menos um campo para pesquisar.");      
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
    console.log();
    if(camposPesquisa.titulo.length == 0  
    && camposPesquisa.subtitulo.length == 0 
    && camposPesquisa.nomeEmpregador.length == 0 
    && camposPesquisa.estado.length == 0
    && camposPesquisa.cidade.length == 0 
    ){
      return true;
    }
    else{
      return false;
    }
  }

}
