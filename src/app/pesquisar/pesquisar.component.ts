import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../services/funcionario/funcionario';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html'
})
export class PesquisarComponent implements OnInit {
  
  funcionario: Funcionario;

  constructor() {}

  ngOnInit():void {
  
    }
 
}
