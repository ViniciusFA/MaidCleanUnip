import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpregadorService } from '../../services/empregador/empregador.service';
import { Empregador } from 'src/app/services/empregador/empregador';
import { Response } from '../../services/response';

@Component({
  selector: 'app-cadastro-empregador',
  templateUrl: './cadastro-empregador.component.html'
})
export class CadastroEmpregadorComponent implements OnInit {

  empregador: Empregador = new Empregador();
  submetido = false;

  constructor(private empregadorService: EmpregadorService,
    private router: Router) { }

  ngOnInit() {
  }

  cadastrar():void{
    this.submetido = false;
    this.empregador = new Empregador();
  }

  salvar(){
    this.empregadorService.criarEmpregador(this.empregador)
                          .subscribe(response=> {
      let res:Response = <Response>response;
      
      if(res.codigo == 1){
        alert(res.mensagem);
        this.empregador = new Empregador();   
      }else{
        alert(res.mensagem);
      }
    }
    ,(erro) =>{
      alert(erro);  
    });    
  }

  voltar():void{
    this.router.navigate(['/cadastro']);
  }

}
