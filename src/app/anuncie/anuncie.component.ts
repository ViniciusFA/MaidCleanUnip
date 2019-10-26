import { Component, OnInit } from '@angular/core';
import { Estados } from '../util/estados';

@Component({
  selector: 'app-anuncie',
  templateUrl: './anuncie.component.html'
})
export class AnuncieComponent implements OnInit {

  private titulo:string = '';
  private estado
  constructor() { }

  ngOnInit() {
    this.titulo = 'Anuncie';
  }

  estados = [
    new Estados(0, 'Estado'),
    new Estados(1, 'Rio de Janeiro'),
    new Estados(2, 'São Paulo'),
  ];

}
