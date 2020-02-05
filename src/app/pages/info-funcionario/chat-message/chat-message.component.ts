import { Usuario } from './../../../system-objects/usuario-model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit {

  private serverURL = 'http://localhost:8090/socket';
  private title = 'WebScokets chat';
  private stompClient;
  private formulario: FormGroup;
  private usuario: Usuario = new Usuario();
  private nomeChat: String = '';
  private sobreNomeChat: String = '';
  private elementRef: ElementRef;
  id = 'containerChat';

  constructor(private formBuilder: FormBuilder) {
    this.configurarFormulario();
  }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
    this.abrirChatMessage();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      message: new FormControl('', [Validators.required, Validators.minLength(1)])
    })
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverURL);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/chat", (message) => {
        //pega o ususario logado e cadastrado no local storage
        var nomeUsuario = JSON.parse(localStorage.getItem('Usuario'));
        this.usuarioLogado = nomeUsuario.login;

        //escreve no topo do body do chat
        $(".chat").append("<div class='tituloMessageChat'>" + this.usuarioLogado + "</div");
        //cada vez qaue envia mensagem entra nesse if
        if (message.body) {
          $(".chat").append("<div class='message'>" + message.body + "</div>");
        }
      })
    })
  }


  hideShowPainel() {
    let panelHeading = document.getElementById('id-panel-heading');
    let painelBody = document.getElementById('panel-body');
    let painelFooter = document.getElementById('panel-footer');
    let painelBodyActive: boolean = painelBody.hidden;
    let painelFooterActive: boolean = painelFooter.hidden;

    if (painelBodyActive && painelFooterActive) {
      painelBody.hidden = false;
      painelFooter.hidden = false;
      panelHeading.style['marginTop'] = "0px";
    } else {
      painelBody.hidden = true;
      painelFooter.hidden = true;
      panelHeading.style['marginTop'] = "300px";
    }

  }

  sendMessage(message) {
    console.log(message);
    this.stompClient.send("/app/send/message", {}, message);
    this.formulario.reset();
  }

  abrirChatMessage() {
    //pega funcionario do localstorage para inserir nome e sobrenome no topo do chat
    var jsonNomeChat = localStorage.getItem('nomeChat');
    var jsonSobreNomeChat = localStorage.getItem('sobrenomeChat');
    this.nomeChat = jsonNomeChat;
    this.sobreNomeChat = jsonSobreNomeChat;
  }

  atualizarChat() {
  }

  disponivel() {
    const elementPanelHeading = document.getElementById('id-panel-heading');
    elementPanelHeading.style.backgroundColor = '#4cb961';
  } s

  ocupado() {
    const elementPanelHeading = document.getElementById('id-panel-heading');
    elementPanelHeading.style.backgroundColor = '#e66666';
  }

  ausente() {
    const elementPanelHeading = document.getElementById('id-panel-heading');
    elementPanelHeading.style.backgroundColor = '#b6bd66';
  }

  fecharMessageChat() {
    const elementPanelHeading = document.getElementById('id-panel-heading');
    elementPanelHeading.style.backgroundColor = '#babada';
  }

}
