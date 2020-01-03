import { ActivatedRoute } from '@angular/router';
import { Avaliacoes } from './../../system-objects/avaliacoes-model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { RoleEnum } from './../../system-objects/role-enum';
import { PesquisarComponent } from './../pesquisar/pesquisar.component';
import { Usuario } from './../../system-objects/usuario-model';
import { AvaliacoesService } from './../../services/avaliacoes/avaliacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-template',
  templateUrl: './rating-template.component.html',
  styles: [`
    .star {
      font-size: 1.5rem;
      color: #d1d2d4;
    }
    .filled {
      color: #ccc61a;
    }
    .bad {
      color: #deb0b0;
    }
    .medium {
      color: #7392cc;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class NgbdRatingTemplate implements OnInit{
  currentRate = 5;
  media:number = 0.0;
  private users:Usuario[] = new Array;
  private pesquisar:PesquisarComponent ;
  private avaliations: Avaliacoes = new Avaliacoes();
  private idUser:number=0;

  constructor(private avaliacoesService:AvaliacoesService,
              private usuarioService:UsuarioService,
              private activatedRoute: ActivatedRoute  ){   
  }

  ngOnInit(){
   
  } 


  getUsers(){
    
  }


  getAvaliation(idUser:number){
    console.log(idUser);
     this.avaliacoesService.getAvaliationsUser(idUser).subscribe(res => {
       this.avaliations = res;
       this.getAverageAvaliation(this.avaliations);
     });
  }

  getAverageAvaliation(avaliacoes:Avaliacoes){
    if(avaliacoes == null ||  avaliacoes.compromisso == 0.0 && 
      avaliacoes.disciplina == 0.0 && avaliacoes.limpeza == 0.0 && 
      avaliacoes.organizacao == 0.0){
        this.media = 0.0;
      }else{
        this.media = (avaliacoes.compromisso + avaliacoes.disciplina 
                      + avaliacoes.limpeza + avaliacoes.organizacao)/4;
          this.media = (parseFloat(this.media.toFixed(2)));
      }    
    } 
}
