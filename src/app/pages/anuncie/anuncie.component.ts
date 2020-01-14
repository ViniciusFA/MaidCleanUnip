import { Cidade } from './../../system-objects/cidade-model';
import { LocalidadeService } from './../../services/localidade/localidade.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Estados } from '../../util/estados';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Vaga } from 'src/app/services/vaga/vaga';
import { VagaService } from 'src/app/services/vaga/VagaService';
import { Response } from '../../services/response';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-anuncie',
  templateUrl: './anuncie.component.html'
})
export class AnuncieComponent implements OnInit {

  private titulo: string = '';
  private formulario: FormGroup;
  private vaga: Vaga;
  private caracteresMaximo: number = 400;
  private nameField: string = '';
  private id: number = 0;
  private cities: Array<Cidade>;
  private states: Array<Estados>;

  constructor(private formBuilder: FormBuilder,
    private vagaService: VagaService,
    private localidadeService: LocalidadeService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = 'Anunciar Vagas';
    //this.getNameUser();
    this.fillFieldIdName();
    this.getStates();
  }

  fillFieldIdName() {
    this.id = JSON.parse(localStorage.getItem('IdUser'));
    this.nameField = localStorage.getItem('NameUser');
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nomeEmpregador: new FormControl(''),
      titulo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      subtitulo: new FormControl('', [Validators.minLength(3), Validators.maxLength(40)]),
      cidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      estado: new FormControl('', Validators.required),
      telefone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      descricao: new FormControl('', [Validators.required, Validators.maxLength(400)])
    });
  }


  anunciar() {
    let vaga = this.formulario.value as Vaga;

    vaga.idEmpregador = JSON.parse(localStorage.getItem('IdUser'));
    vaga.nomeEmpregador = localStorage.getItem("NomeUser");

    console.log(vaga.nomeEmpregador);

    this.vagaService.anunciarVagas(vaga).subscribe(response => {
      let res: Response = <Response>response;
      if (res.codigo == 1) {
        alert(res.mensagem);
        this.vaga = new Vaga();
        this.formulario.reset();
      } else {
        alert(res.mensagem);
      }
    }, (erro) => {
      alert(erro);
    });
  }

  limparCampos() {
    (<HTMLSelectElement>document.getElementById('campoAnuncieVagasEmpregador')).value = "";
    (<HTMLSelectElement>document.getElementById('campoAnuncievagaTitulo')).value = "";
    (<HTMLSelectElement>document.getElementById('campoAnuncioVagaSubtitulo')).value = "";
    (<HTMLSelectElement>document.getElementById('campoEstadoVagas')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoAnuncievagasCidade')).value = "";
    (<HTMLSelectElement>document.getElementById('campoAnuncievagastelefone')).value = "";
    (<HTMLSelectElement>document.getElementById('textoLabelAnuncieDesc')).value = "";
  }

  getCities(id_estado: any) {
    this.localidadeService.getCitys(id_estado).subscribe(data => {
      this.cities = data;
    });
  }

  getStates() {
    this.localidadeService.getStates().subscribe(data => {
      this.states = data;
    })
  }

}
