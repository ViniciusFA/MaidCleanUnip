import { Component, OnInit } from '@angular/core';
import { Vaga } from './vaga';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Estados } from '../util/estados';
import { Residencia } from '../util/residencia';

@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.component.html'
})
export class OportunidadesComponent implements OnInit {
  
  private Vaga: Vaga[] = new Array();
  private titulo:string;
  private formulario:FormGroup;  

  constructor(private formBuilder:FormBuilder) { 

    this.configurarFormulario();
  }

  ngOnInit() {   
    this.titulo = "Oportunidades";   
  }

  estados = [
    new Estados(0, 'Estado'),
    new Estados(1, 'Rio de Janeiro'),
    new Estados(2, 'São Paulo'),
  ];

  residencias = [
    new Residencia(0, 'Residência'),
    new Residencia(1, 'Apartamento'),
    new Residencia(2, 'Casa'),
  ];

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      nomeVaga:new FormControl(''),
      assunto:new FormControl(''),
      estado:new FormControl(''),
      cidade:new FormControl(''),
      residencia:new FormControl(''),
      experiencia:new FormControl('')
    });
  }

  limparCampos(){
    (<HTMLSelectElement>document.getElementById('campoNome')).value = "";
    (<HTMLSelectElement>document.getElementById('campoSobreNome')).value = "";
    (<HTMLSelectElement>document.getElementById('campoEstado')).value = "Estado";
    (<HTMLSelectElement>document.getElementById('campoCidade')).value = ""; 
    (<HTMLSelectElement>document.getElementById('campoSexo')).value = "Residência"; 
    (<HTMLSelectElement>document.getElementById('campoExperiencia')).value = "Experiência";  
  }

}
