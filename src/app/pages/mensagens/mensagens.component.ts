import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html'
})
export class MensagensComponent implements OnInit {

  private pageOfItems: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  apagarMensagem(){}

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

}
