import { Component, OnInit } from '@angular/core';
import { Contato } from "../services/contato/contato.";
import { Response } from '../services/response';
import { ContatoService } from '../services/contato/contato.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {

  private contato:Contato = new Contato();
  private titulo:string;

  constructor(private contatoService:ContatoService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.titulo="Fale Conosco";
  }

  limparCampos():void{
    (<HTMLSelectElement>document.getElementById('inputNome')).value = "";
    (<HTMLSelectElement>document.getElementById('inputSobreNome')).value = "";
    (<HTMLSelectElement>document.getElementById('exampleFormControlInput1')).value = "";
    (<HTMLSelectElement>document.getElementById('exampleFormControlTextarea1')).value = ""; 
  }

  enviar(){
    this.contatoService.sendMessage(this.contato)
    .subscribe(response => {

      let res:Response = <Response>response;

      if(res.codigo == 1){
        alert(res.mensagem);
        this.contato = new Contato();
      }else{
        alert(res.mensagem);
      }
    },
    (erro) =>{
      alert(erro);
    });
  }
}
