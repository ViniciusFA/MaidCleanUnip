import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-legislacao',
  templateUrl: './legislacao.component.html'
})
export class LegislacaoComponent implements OnInit {

  private url:String = '';
  private nomeArquivoSelecionado:String = 'teste';
  private arquivoMovManual: any ;
  private titulo:String = '';

  constructor(
              private router:Router) { }

  ngOnInit() {
    this.titulo = "Legislação e Recomendações"
  }

  downloadLeiL11324(){
   
  }

  downloadLei150(){
  }


}
