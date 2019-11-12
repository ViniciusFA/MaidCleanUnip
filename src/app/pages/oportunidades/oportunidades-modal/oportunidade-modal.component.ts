import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaga } from 'src/app/services/vaga/vaga';

@Component({
  selector: 'app-oportunidade-modal',
  templateUrl: './oportunidade-modal.component.html',
})
export class OportunidadesModalComponent implements OnInit {

  private titulo:String = '';
  private vaga:Vaga = new Vaga();
  //Configurando Google Maps
  textoGoogleMaps : string = 'Localidade da vaga'; 
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;

  constructor(private activatedRoute: ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.titulo = 'Informações da Vaga';
    this.recebendoParamsFuncionario();
  }

  recebendoParamsFuncionario(){    
    //passando os parametros vindo da pagina anterior para os labels
    this.vaga.id = this.activatedRoute.snapshot.queryParams.id_vaga;
    this.vaga.titulo = this.activatedRoute.snapshot.queryParams.titulo;
    this.vaga.subtitulo = this.activatedRoute.snapshot.queryParams.subtitulo;
    this.vaga.nomeEmpregador = this.activatedRoute.snapshot.queryParams.nomeEmpregador;
    this.vaga.estado = this.activatedRoute.snapshot.queryParams.estado;
    this.vaga.cidade = this.activatedRoute.snapshot.queryParams.cidade;
    this.vaga.descricao = this.activatedRoute.snapshot.queryParams.descricao;
  }

  Candidatar(){
    alert("Candidatura enviada com sucesso.");
    this.router.navigate(['/oportunidades']);
  }
}
