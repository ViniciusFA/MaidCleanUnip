import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html'
})
export class PesquisarComponent implements OnInit {
  
  result: Object;
  urlToJson = 'http://localhost:3000/empregados';

  constructor(public http:HttpClient) {}

  ngOnInit():void {
    this.http.get<any>(this.urlToJson).subscribe(response => {
      this.result = JSON.parse(JSON.stringify(response));  
      });
    }
 
}
