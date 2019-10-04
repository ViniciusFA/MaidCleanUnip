import { Component, OnInit } from '@angular/core';
import { Vaga } from './vaga';

@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.component.html'
})
export class OportunidadesComponent implements OnInit {
  
  private Vaga: Vaga[] = new Array();
  private titulo:string;

  constructor() { }

  ngOnInit() {   
    this.titulo= "Vagas";   
  }
}
