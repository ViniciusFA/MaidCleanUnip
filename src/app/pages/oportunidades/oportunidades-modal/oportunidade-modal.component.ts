import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vaga } from 'src/app/services/vaga/vaga';

@Component({
  selector: 'app-oportunidade-modal',
  templateUrl: './oportunidade-modal.component.html',
})
export class OportunidadesModalComponent implements OnInit {

  private titulo:String = '';
  private vaga:Vaga = new Vaga();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.titulo = 'Informações da Vaga';
    this.recebendoParamsFuncionario();
  }

  recebendoParamsFuncionario(){
   // this.vaga.id = this.activatedRoute.snapshot.queryParams.id;
    this.vaga.nomeEmpregador = this.activatedRoute.snapshot.queryParams.nomeEmpregador;
    this.vaga.titulo = this.activatedRoute.snapshot.queryParams.titulo;
    //console.log(this.vaga.id);
    console.log(this.vaga.nomeEmpregador);
    console.log(this.vaga.titulo);
  }
}
