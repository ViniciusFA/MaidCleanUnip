import { ActivatedRoute } from '@angular/router';
import { Usuario } from './../../../system-objects/usuario-model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit{

  private serverURL = 'http://localhost:8090/socket';
  private title = 'WebScokets chat';
  private stompClient;
  private formulario:FormGroup;
  private usuario:Usuario = new Usuario();
  private nomeChat:String = '';
  private sobreNomeChat:String = '';
  private elementRef: ElementRef;

  constructor(private formBuilder: FormBuilder
              //,private activatedRoute: ActivatedRoute
              ) { 
    this.configurarFormulario();
  }

  ngOnInit():void {
    this.initializeWebSocketConnection();  
    this.abrirChatMessage();
  }

configurarFormulario(){
  this.formulario = this.formBuilder.group({
    message: new FormControl('',[Validators.required,Validators.minLength(1)])
  })
}

recebendoParametros(){
  //this.nomeChat = this.activatedRoute.snapshot.queryParams.nome;
  //this.sobreNomeChat = this.activatedRoute.snapshot.queryParams.sobrenome;
  //console.log(this.nomeChat);
  //console.log(this.sobreNomeChat);
}

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverURL);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({},function(frame){
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body){
          $(".chat").append("<div class='message'>"+message.body+"</div>");
          console.log(message.body);
        }
      })
    })
  }

  sendMessage(message){
    console.log(message);
    this.stompClient.send("/app/send/message" , {}, message);
    this.formulario.reset();
  }

  abrirChatMessage(){  
    //pega funcionario do localstorage para inserir nome e sobrenome no topo do chat
    var jsonNomeChat = localStorage.getItem('nomeChat');
    var jsonSobreNomeChat = localStorage.getItem('sobrenomeChat');
    this.nomeChat = jsonNomeChat;
    this.sobreNomeChat = jsonSobreNomeChat;
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
