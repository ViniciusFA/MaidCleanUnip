import { Component, OnInit } from '@angular/core';
import { Estados } from '../../util/estados';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Vaga } from 'src/app/services/vaga/vaga';
import { VagaService } from 'src/app/services/vaga/VagaService';
import { Response } from '../../services/response';

@Component({
  selector: 'app-anuncie',
  templateUrl: './anuncie.component.html'
})
export class AnuncieComponent implements OnInit {

  private titulo:string = '';
  private formulario:FormGroup;
  private vaga:Vaga;


  constructor(private formBuilder:FormBuilder,
              private vagaService:VagaService) { 
    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = 'Anunciar Vagas';
  }

  estados = [
    new Estados(0, 'Estado'),
    new Estados(1, 'Rio de Janeiro'),
    new Estados(2, 'São Paulo'),
  ];

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      nomeEmpregador: new FormControl(''),
      titulo: new FormControl(''),
      subtitulo: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      telefone: new FormControl(''),
      descricao: new FormControl('')
    });
    console.log(this.formulario);
  }

  anunciar(){
    let vaga = this.formulario.value as Vaga;

    this.vagaService.anunciarVagas(vaga).subscribe(response => {

      let res: Response = <Response>response;

      if(res.codigo == 1){
        alert(res.mensagem);
        this.vaga = new Vaga();
        this.formulario.reset();
      }else{
        alert(res.mensagem);
      }
    },(erro) => {
      alert(erro);
    });
  }

}
