import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.component.html'
})
export class OportunidadesComponent implements OnInit {

  private titulo:string;

  constructor() { }

  ngOnInit() {   
    this.titulo= "Oportunidades";   
  }

  
}
