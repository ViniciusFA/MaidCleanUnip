import { UtilService } from './../../services/util/util.service';
import { ImagemPerfil } from './../../system-objects/imagem-perfil-model';
import { ExperienciaService } from './../../services/experienciaService/experiencia.service';
import { Avaliacoes } from './../../system-objects/avaliacoes-model';
import { AvaliacoesService } from './../../services/avaliacoes/avaliacoes.service';
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
  private avaliacoes: Avaliacoes = new Avaliacoes();
  private imageUrl: string = "/assets/img/funcionario/photo-here.jpg";
  private experiencias: Array<String> = new Array;
  private chatActivated = false;
  private fileToUpload: File = null;
  private media:number = 0.0;    

  @ViewChild('confirmExcluir', { static: false }) confirmExcluir: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private avaliacoesService: AvaliacoesService, 
    private experienciaService: ExperienciaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private utilService: UtilService) {
    this.configurarCampos();
  }

  ngOnInit() {
    this.titulo = "Informação Funcionário";
    this.recebendoParamsFuncionario();   
    this.uploadPicture(); 
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

  getUserById(id_user:number){
    this.usuarioService.getUsuarioById(id_user).subscribe( data => {
      this.usuarioInfo = data;
      
      if(this.usuarioInfo.facebook == null)
        this.usuarioInfo.facebook ="Não tem facebook";

      if(this.usuarioInfo.hasWhatsapp == '1')
        this.usuarioInfo.hasWhatsapp = "Sim";
      else
        this.usuarioInfo.hasWhatsapp = "Não";
    })
  }

  //método que captura o funcionário selecionado no badge info da página pesquiasr
  recebendoParamsFuncionario() {    
    let id_user:number = this.activatedRoute.snapshot.queryParams.idUsuario;
     this.getUserById(id_user);   
     this.getAvaliations(id_user);    
  }

  uploadPicture() {
    let respostaReal: String = "";
    let sizeAllowed: boolean = false;
    let user: Usuario = new Usuario();
    let imagePerfil: ImagemPerfil = new ImagemPerfil();
    const formData = new FormData();

    console.log(this.usuarioInfo.idUsuario);

    let id_user:number = this.activatedRoute.snapshot.queryParams.idUsuario;
    console.log(id_user);
    ///assets/img/funcionario/photo-here.jpg
    this.utilService.getPhotoProfile(id_user).subscribe(data => {      
      if(data != null){
        this.imageUrl = data;
      }else{
        this.imageUrl = "/assets/img/funcionario/photo-here.jpg";
      }
      
    })

  }

  getUser(): Usuario {
    let idUser = this.activatedRoute.snapshot.queryParams.idUsuario;

    
    this.usuarioService.getUsuarioById(idUser).subscribe(data => {
      this.usuarioInfo = data;
    });

    return this.usuarioInfo
  }

  converterSizePicture(file: File): boolean {
    let sizePictureByte: any;
    let letsizePictureKB: any;
    let sizeLimitToUploadKB: number = 300;

    sizePictureByte = file.size;
    letsizePictureKB = Number.parseInt(Math.trunc((sizePictureByte / 1024)).toFixed(3));

    if (letsizePictureKB > sizeLimitToUploadKB)
      return false;
    else
      return true;
  }

  //Exclui um funcionário ao clicar no botão excluir
  excluir(usuarioInfo: Usuario) {
    this.usuarioService.deleteUsuario(this.usuarioInfo.idUsuario)
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
    this.usuarioInfo.idUsuario = objetoFuncValueAntigo[0];
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
    this.usuarioInfo.facebook = objetoFuncValueAntigo[15];
    this.usuarioInfo.hasWhatsapp = objetoFuncValueAntigo[16];
    this.usuarioInfo.experiencia.tempo  = objetoFuncValueAntigo[17];
    //this.usuarioInfo.id_avaliacao = objetoFuncValueAntigo[18];

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
        });
  }

  sendMessageChat() {
    localStorage.setItem("nomeChat", this.usuarioInfo.nome);
    localStorage.setItem("sobrenomeChat", this.usuarioInfo.sobrenome);

    this.chatActivated = true;
    //armazenando o nome e sobrenome do funcionario escolhido no local storage

  }
  fecharMessageChat() {
    this.chatActivated = false;
    alert(this.chatActivated);
  }

  getExperience() {
    this.experienciaService.getExperiences().subscribe(res => {
      this.experiencias = res;
    })
  }

  getAvaliations(idUser:number){
    this.avaliacoesService.getAvaliationsUser(idUser).subscribe(res => {
      this.avaliacoes = res;
      this.getAverageAvaliation(this.avaliacoes);
    });   
  }

  getAverageAvaliation(avaliations:Avaliacoes){
    this.media = (this.avaliacoes.compromisso + this.avaliacoes.disciplina 
                  + this.avaliacoes.limpeza + this.avaliacoes.organizacao)/4;
    this.media = (parseFloat(this.media.toFixed(2)));
    }
}




