import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../services/login/AutenticacaoService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private auth:AutenticacaoService,
               private router:Router) { }

  ngOnInit() {
    this.auth.usuarioLogOut();
    this.router.navigate(['login']);
  }

}
