import { OportunidadesModalComponent } from './../oportunidade-modal.component';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-message-oportunity',
  templateUrl: './chat-message-oportunity.component.html'
})
export class ChatMessageOportunityComponent implements OnInit {

  private serverURL = 'http://localhost:8090/socket';
  private title = 'WebScokets chat';
  private stompClient;
  private formulario:FormGroup;
  private nomeChat:String = '';
  private sobreNomeChat:String = '';
  private elementRef: ElementRef;
  private usuarioLogado:String = '';
  private nomeEmpregador:String = '';

  constructor(private formBuilder: FormBuilder,
              private oportunityModal:OportunidadesModalComponent) { 
    this.configurarFormulario();
  }

  ngOnInit():void {   
    this.initializeWebSocketConnection();  
    this.receberNomeParam();
    this.abrirChatMessage();
  }

configurarFormulario(){
  this.formulario = this.formBuilder.group({
    message: new FormControl('',[Validators.required,Validators.minLength(1)])
  })
}

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverURL);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({},function(frame){
      that.stompClient.subscribe("/chat", (message) => {
         //pega o ususario logado e cadastrado no local storage
         var nomeUsuario = JSON.parse(localStorage.getItem('Usuario'));
         this.usuarioLogado = nomeUsuario.login;

        //escreve no topo do body do chat
        $(".chat").append("<div class='tituloMessageChat'>" + this.usuarioLogado + "</div");
        //cada vez qaue envia mensagem entra nesse if
        if(message.body){          
            $(".chat").append("<div class='message'>" + message.body + "</div>");
            console.log("Message:");
            console.log(message);
        }
      })
    })
  }
  
  
  sendMessage(message){    
    this.stompClient.send("/app/send/message" , {}, message,this.nomeChat);
    this.formulario.reset();
  }

  abrirChatMessage(){  
    //pega nome do empregador escolhido ao abrir o chat
    this.nomeChat = localStorage.getItem('nomeChat');
    this.sobreNomeChat = localStorage.getItem('sobrenomeChat');

    //pega nome do funcionario escolhido ao abrir o chat
    var nomeUsuario = JSON.parse(localStorage.getItem('Usuario'));
    this.usuarioLogado = nomeUsuario.login;
  }
   
  //recebe nome empregador para inserir no topo do chat
  receberNomeParam(){
    this.nomeEmpregador = this.oportunityModal.enviarParamChatMessage();
  }

  atualizarChat(){
  }

  disponivel(){
    const elementPanelHeading = document.getElementById('id-panel-heading');
    elementPanelHeading.style.backgroundColor = '#4cb961';
  }s

  ocupado(){
    const elementPanelHeading = document.getElementById('id-panel-heading');
    elementPanelHeading.style.backgroundColor = '#e66666';
  }

  ausente(){
    const elementPanelHeading = document.getElementById('id-panel-heading');
    elementPanelHeading.style.backgroundColor = '#b6bd66';
  }

  fecharMessageChat(){
    const elementPanelHeading = document.getElementById('id-panel-heading');
    elementPanelHeading.style.backgroundColor = '#babada';
  }

}
