import { ChatMessageComponent } from './chat-message/chat-message.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from './../../system-objects/usuario-model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Funcionario } from '../../services/funcionario/funcionario';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '../../services/response';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-funcionario',
  templateUrl: './info-funcionario.component.html'
})
export class InfoFuncionarioComponent implements OnInit {
  private titulo: string;
  private usuarioInfo: Usuario = new Usuario();
  private formulario: FormGroup;
  private edicao: Boolean = true;
  private usuarioInfoNovo: Usuario = new Usuario();
  private chatActivated = false;
  

  @ViewChild('confirmExcluir', { static: false }) confirmExcluir: ElementRef;
  @ViewChild('btnEdicao', { static: false }) btnEdicao;

  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.configurarCampos();   
  }

  ngOnInit() {
    this.titulo = "Informação Funcionário";
    this.recebendoParamsFuncionario();
    //console.log(this.usuarioInfo.nome);
    //console.log(this.usuarioInfo.sobrenome);
  }

  //recebe os dados no formulario inserido pelo usuário
  configurarCampos() {
    this.formulario = this.formBuilder.group({
      id: new FormControl({ value: '', disabled: true }),
      nome: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      sobrenome: new FormControl({ value: '', disabled: true }, [Validators.minLength(3), Validators.maxLength(40)]),
      email: new FormControl({ value: '', disabled: true }, [Validators.email, Validators.maxLength(50)]),
      login: new FormControl({ value: '', disabled: true }),
      senha: new FormControl({ value: '', disabled: true }, [Validators.minLength(5), Validators.maxLength(8)]),
      facebook: new FormControl({ value: '', disabled: true }, [Validators.maxLength(80)]),
      whatsapp: new FormControl({ value: '', disabled: true }, Validators.maxLength(3)),
      telefone: new FormControl({ value: '', disabled: true }, [Validators.maxLength(13)]),
      profissao: new FormControl({ value: '', disabled: true }, [Validators.maxLength(40)]),
      experiencia: new FormControl({ value: '', disabled: true }, [Validators.maxLength(35)]),
      cpf_cnpj: new FormControl({ value: '', disabled: true }, [Validators.maxLength(11)]),
      endereco: new FormControl({ value: '', disabled: true }, [Validators.maxLength(100)]),
      complemento: new FormControl({ value: '', disabled: true }, [Validators.maxLength(15)]),
      cidade: new FormControl({ value: '', disabled: true }, [Validators.maxLength(15)]),
      estado: new FormControl({ value: '', disabled: true }, [Validators.maxLength(30)]),
      cep: new FormControl({ value: '', disabled: true }, [Validators.maxLength(13)]),
      avaliacao: new FormControl({ value: '', disabled: true }, [Validators.maxLength(2)]),
      sexo: new FormControl({ value: '', disabled: true }, [Validators.maxLength(9)]),
    });
  }

  //método que captura o funcionário selecionado no badge info da página pesquiasr
  recebendoParamsFuncionario() {
    //recebendo os valores vindo da router através do queryParams
    this.usuarioInfo.id = this.activatedRoute.snapshot.queryParams.idUsuario;
    this.usuarioInfo.nome = this.activatedRoute.snapshot.queryParams.nome;
    this.usuarioInfo.sobrenome = this.activatedRoute.snapshot.queryParams.sobrenome;
    this.usuarioInfo.login = this.activatedRoute.snapshot.queryParams.login;
    this.usuarioInfo.senha = this.activatedRoute.snapshot.queryParams.senha;
    this.usuarioInfo.email = this.activatedRoute.snapshot.queryParams.email;
    this.usuarioInfo.cpf_cnpj = this.activatedRoute.snapshot.queryParams.cpf_cnpj;
    this.usuarioInfo.endereco = this.activatedRoute.snapshot.queryParams.endereco;
    this.usuarioInfo.complemento = this.activatedRoute.snapshot.queryParams.complemento;
    this.usuarioInfo.cidade = this.activatedRoute.snapshot.queryParams.cidade;
    this.usuarioInfo.estado = this.activatedRoute.snapshot.queryParams.estado;
    this.usuarioInfo.cep = this.activatedRoute.snapshot.queryParams.cep;
    this.usuarioInfo.sexo = this.activatedRoute.snapshot.queryParams.sexo;
    this.usuarioInfo.telefone = this.activatedRoute.snapshot.queryParams.telefone;

    //se o campo urlFacebbok estiver null ou vazio receberá um texto personalizado
    if (this.usuarioInfo.urlFacebook == undefined ||
      this.usuarioInfo.urlFacebook == "" ||
      this.usuarioInfo.urlFacebook == null) {
      this.usuarioInfo.urlFacebook = "Não cadastrou facebook.";
    } else {
      this.usuarioInfo.urlFacebook = this.activatedRoute.snapshot.queryParams.urlFacebook;
    }
    //se o campo hasWhatsapp estiver null ou vazio receberá um texto personalizado
    if (this.activatedRoute.snapshot.queryParams.hasWhatsapp == undefined ||
      this.activatedRoute.snapshot.queryParams.hasWhatsapp == "" ||
      this.activatedRoute.snapshot.queryParams.hasWhatsapp == null) {
      this.usuarioInfo.urlFacebook = "Não cadastrou whatsapp.";
    } else {
      this.usuarioInfo.hasWhatsapp = this.activatedRoute.snapshot.queryParams.hasWhatsapp;
      if (this.usuarioInfo.hasWhatsapp == '1') {
        this.usuarioInfo.hasWhatsapp = 'Sim';
      } else {
        this.usuarioInfo.hasWhatsapp = 'Não';
      }
    }
    //se o campo experiencia estiver null ou vazio receberá um texto personalizado
    if (this.activatedRoute.snapshot.queryParams.experiencia == undefined ||
      this.activatedRoute.snapshot.queryParams.experiencia == "" ||
      this.activatedRoute.snapshot.queryParams.experiencia == null) {
      this.usuarioInfo.experiencia = "Sem experiência.";
    } else {
      this.usuarioInfo.experiencia = this.activatedRoute.snapshot.queryParams.experiencia;
    }
    //se o campo avaliacao estiver null ou vazio receberá um texto personalizado
    if (this.activatedRoute.snapshot.queryParams.avaliacao == undefined ||
      this.activatedRoute.snapshot.queryParams.avaliacao == "" ||
      this.activatedRoute.snapshot.queryParams.avaliacao == null) {
      this.usuarioInfo.avaliacao = "Ainda não possui avaliação.";
    } else {
      this.usuarioInfo.avaliacao = this.activatedRoute.snapshot.queryParams.avaliacao;
    }
    //se o campo profissao estiver null ou vazio receberá um texto personalizado
    if (this.activatedRoute.snapshot.queryParams.profissao == undefined ||
      this.activatedRoute.snapshot.queryParams.profissao == "" ||
      this.activatedRoute.snapshot.queryParams.profissao == null) {
      this.usuarioInfo.profissao = "Profissão não cadastrada.";
    } else {
      this.usuarioInfo.profissao = this.activatedRoute.snapshot.queryParams.profissao;
    }

  }

  //Exclui um funcionário ao clicar no botão excluir
  excluir(usuarioInfo: Usuario) {
    this.usuarioService.deleteUsuario(this.usuarioInfo.id)
      .subscribe(response => {
        let res: Response = <Response>response;
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.router.navigate(['pesquisar']);
          this.confirmExcluir.nativeElement.click();

        } else {
          alert(res.mensagem);
        }
      },
        (erro) => {
          alert(erro);
        });
  }

  //Habilitando edição dos campos após clicar no badge Editar
  habilitarEdicao(inputEscolhido: String) {
    if (inputEscolhido == this.usuarioInfo.nome) {
      this.formulario.controls['nome'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.sobrenome) {
      this.formulario.controls['sobrenome'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.senha) {
      this.formulario.controls['senha'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.email) {
      this.formulario.controls['email'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.urlFacebook) {
      this.formulario.controls['urlFacebook'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.hasWhatsapp) {
      this.formulario.controls['hasWhatsapp'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.telefone) {
      this.formulario.controls['telefone'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.profissao) {
      this.formulario.controls['profissao'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.experiencia) {
      this.formulario.controls['experiencia'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.cpf_cnpj) {
      this.formulario.controls['cpf_cnpj'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.endereco) {
      this.formulario.controls['endereco'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.complemento) {
      this.formulario.controls['complemento'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.cidade) {
      this.formulario.controls['cidade'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.estado) {
      this.formulario.controls['estado'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.cep) {
      this.formulario.controls['cep'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.avaliacao) {
      this.formulario.controls['avaliacao'].enable();
    }
    if (inputEscolhido == this.usuarioInfo.sexo) {
      this.formulario.controls['sexo'].enable();
    }
    //habilita o botão para alterar a informação do funcionário.
    this.edicao = false;
  }

  atualizar(usuarioInfoNovo: Usuario) {
    usuarioInfoNovo = this.formulario.value;

    //pegando o tamanho dos valores antigos e dos valores novos para utilizar nos for's
    var tamanhoFuncIndiceAntigo: Object = Object.keys(this.usuarioInfo).length;
    var tamanhoFuncIndiceNovo: Object = Object.keys(usuarioInfoNovo).length;

    //pegando os atributos do objeto antigo e do objeto novo
    var objetoFuncNomeAtrAntigo: string[] = Object.getOwnPropertyNames(this.usuarioInfo);
    var objetoFuncNomeAtrNovo: string[] = Object.getOwnPropertyNames(usuarioInfoNovo);

    //pegando os valores do objeto antigo e do objeto novo para atualiza-los
    var objetoFuncValueAntigo = Object.values(this.usuarioInfo);
    var objetoFuncValueNovo = Object.values(usuarioInfoNovo);


    for (var j = 0; j < tamanhoFuncIndiceNovo; j++) {
      for (var i = 0; i < tamanhoFuncIndiceAntigo; i++) {
        if (objetoFuncNomeAtrAntigo[i] == objetoFuncNomeAtrNovo[j]) {
          //objeto com valores antigos receberá valores novos(atualizados).            

          objetoFuncValueAntigo[i] = objetoFuncValueNovo[j];
        }
      }
    }

    //recebendo valores novos do objetoFUncValueAntigo
    this.usuarioInfo.id = objetoFuncValueAntigo[0];
    this.usuarioInfo.nome = objetoFuncValueAntigo[1];
    this.usuarioInfo.sobrenome = objetoFuncValueAntigo[2];
    this.usuarioInfo.login = objetoFuncValueAntigo[3];
    this.usuarioInfo.senha = objetoFuncValueAntigo[4];
    this.usuarioInfo.email = objetoFuncValueAntigo[5];
    this.usuarioInfo.cpf_cnpj = objetoFuncValueAntigo[6];
    this.usuarioInfo.endereco = objetoFuncValueAntigo[7];
    this.usuarioInfo.complemento = objetoFuncValueAntigo[8];
    this.usuarioInfo.cidade = objetoFuncValueAntigo[9];
    this.usuarioInfo.estado = objetoFuncValueAntigo[10];
    this.usuarioInfo.cep = objetoFuncValueAntigo[11];
    this.usuarioInfo.sexo = objetoFuncValueAntigo[12];
    this.usuarioInfo.telefone = objetoFuncValueAntigo[13];
    this.usuarioInfo.profissao = objetoFuncValueAntigo[14];
    this.usuarioInfo.urlFacebook = objetoFuncValueAntigo[15];
    this.usuarioInfo.hasWhatsapp = objetoFuncValueAntigo[16];
    this.usuarioInfo.experiencia = objetoFuncValueAntigo[17];
    this.usuarioInfo.avaliacao = objetoFuncValueAntigo[18];


    this.usuarioService.updateUsuario(this.usuarioInfo)
      .subscribe(response => {
        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        let res: Response = <Response>response;
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.formulario.reset();
          //this.edicao = false;
          //this.router.navigate(['pesquisar']);
        } else {
          alert(res.mensagem);
        }
      },
        (erro) => {
          alert(erro);
        });  }

  sendMessageChat(){
    localStorage.setItem("nomeChat", this.usuarioInfo.nome);
    localStorage.setItem("sobrenomeChat", this.usuarioInfo.sobrenome );
    
    this.chatActivated = true; 
    //armazenando o nome e sobrenome do funcionario escolhido no local storage
    

  }
  fecharMessageChat(){
    this.chatActivated = false;
    alert(this.chatActivated);
  }
}


