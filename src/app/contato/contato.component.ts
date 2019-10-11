import { Component, OnInit } from '@angular/core';
import { Contato } from "../services/contato/contato.";
import { Response } from '../services/response';
import { ContatoService } from '../services/contato/contato.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {

  private contato:Contato = new Contato();
  private titulo:string;
  private formulario:FormGroup;

  constructor(private contatoService:ContatoService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.titulo="Fale Conosco";
    this.configurarFormulario();
  }

  limparCampos():void{
    (<HTMLSelectElement>document.getElementById('inputNome')).value = "";
    (<HTMLSelectElement>document.getElementById('inputSobreNome')).value = "";
    (<HTMLSelectElement>document.getElementById('selectEmail')).value = "";
    (<HTMLSelectElement>document.getElementById('selectMotivo')).value = "Selecione"; 
    (<HTMLSelectElement>document.getElementById('TextAreaMensagm')).value = ""; 
  }

    configurarFormulario(){
      this.formulario = this.formBuilder.group({

        nome:this.formBuilder.control('',[Validators.required, Validators.minLength(3)]),
        sobrenome: this.formBuilder.control('',Validators.minLength(5)),
        email: this.formBuilder.control('',Validators.email),      
        motivo: this.formBuilder.control('',Validators.required),
        mensagem: this.formBuilder.control('')        
      });
    }

  enviar(){
    this.contato = this.formulario.value;

    this.contatoService.sendMessage(this.contato)
    .subscribe(response => {

      let res:Response = <Response>response;

      if(res.codigo == 1){
        alert(res.mensagem);
        this.formulario.reset();
      }else{
        alert(res.mensagem);
      }
    },
    (erro) =>{
      alert(erro);
    });   
  }
}
