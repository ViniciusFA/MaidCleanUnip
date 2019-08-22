import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html'
})
export class RankingComponent implements OnInit {

  result:Object;
  urlToJson = 'http://localhost:3001/ranking';

  constructor(public http:HttpClient) { }

  ngOnInit():void {
    this.http.get<any>(this.urlToJson).subscribe(response => {
      this.result = JSON.parse(JSON.stringify(response));
    });
  }

}
