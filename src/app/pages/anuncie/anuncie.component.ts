import { Component, OnInit } from '@angular/core';
import { Estados } from '../../util/estados';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Vaga } from 'src/app/services/vaga/vaga';
import { VagaService } from 'src/app/services/vaga/VagaService';
import { Response } from '../../services/response';

@Component({
  selector: 'app-anuncie',
  templateUrl: './anuncie.component.html'
})
export class AnuncieComponent implements OnInit {

  private titulo: string = '';
  private formulario: FormGroup;
  private vaga: Vaga;
  private caracteresMaximo: number = 400;

  constructor(private formBuilder: FormBuilder,
    private vagaService: VagaService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = 'Anunciar Vagas';
  }

  estados = [
    new Estados(0, 'Selecione'),
    new Estados(1, 'Estado'),
    new Estados(2, 'Rio de Janeiro'),
    new Estados(3, 'São Paulo'),
  ];

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nomeEmpregador: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
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

}
