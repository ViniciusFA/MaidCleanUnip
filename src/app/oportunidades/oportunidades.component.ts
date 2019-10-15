import { Component, OnInit } from '@angular/core';
import { Vaga } from './vaga';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      nome:new FormControl(''),
      sobrenome:new FormControl(''),
      estado:new FormControl(''),
      cidade:new FormControl(''),
      sexo:new FormControl(''),
      experiencia:new FormControl('')
    });
  }

  limparCampos(){
    (<HTMLSelectElement>document.getElementById('campoNome')).value = "";
    (<HTMLSelectElement>document.getElementById('campoSobreNome')).value = "";
    (<HTMLSelectElement>document.getElementById('campoEstado')).value = "Estado";
    (<HTMLSelectElement>document.getElementById('campoCidade')).value = ""; 
    (<HTMLSelectElement>document.getElementById('campoSexo')).value = "Sexo"; 
    (<HTMLSelectElement>document.getElementById('campoExperiencia')).value = "Experiência";  
  }

}
