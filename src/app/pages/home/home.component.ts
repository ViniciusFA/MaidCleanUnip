import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private titulo:string;

  constructor(private router: Router) { 

  }

  ngOnInit() {
    this.titulo="Home Page";
  }
  cadastrar(){
    this.router.navigate(['cadastro']);
  }
}
