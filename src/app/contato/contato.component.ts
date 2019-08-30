import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  limparCampos():void{
    (<HTMLSelectElement>document.getElementById('inputNome')).value = "";
    (<HTMLSelectElement>document.getElementById('inputSobreNome')).value = "";
    (<HTMLSelectElement>document.getElementById('exampleFormControlInput1')).value = "";
    (<HTMLSelectElement>document.getElementById('exampleFormControlTextarea1')).value = "";    
    
  }

}
