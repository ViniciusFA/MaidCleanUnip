import { Response } from './../services/response';
import { AvaliacoesService } from './../services/avaliacoes/avaliacoes.service';
import { UsuarioService } from './../services/usuario/usuario.service';
import { Usuario } from './../system-objects/usuario-model';
import { Avaliacoes } from './../system-objects/avaliacoes-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private avaliacoesService: AvaliacoesService,
    private usuarioService: UsuarioService,
    private router: Router) {
    this.configurarFormulario();
  }

  private formulario: FormGroup;
  private editingFields: boolean = true;
  private usuarioInfo: Usuario = new Usuario();
  private avaliacoes: Avaliacoes = new Avaliacoes();
  private media: number = 0.0;
  //private selectedFile:File = null;
  private newUsuarioInfo: Usuario = new Usuario();

  ngOnInit() {
    this.recebendoParametroInfoUsuario();
    this.getRatingUser(this.usuarioInfo.idUsuario);
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: new FormControl({ value: '', disabled: true }),
      nome: new FormControl({ value: '', disabled: true }),
      sobrenome: new FormControl({ value: '', disabled: true }),
      login: new FormControl({ value: '', disabled: true }),
      senha: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true }),
      facebook: new FormControl({ value: '', disabled: true }),
      whatsapp: new FormControl({ value: '', disabled: true }),
      telefone: new FormControl({ value: '', disabled: true }),
      profissao: new FormControl({ value: '', disabled: true }),
      experiencia: new FormControl({ value: '', disabled: true }),
      cpf_cnpj: new FormControl({ value: '', disabled: true }),
      endereco: new FormControl({ value: '', disabled: true }),
      complemento: new FormControl({ value: '', disabled: true }),
      cidade: new FormControl({ value: '', disabled: true }),
      estado: new FormControl({ value: '', disabled: true }),
      cep: new FormControl({ value: '', disabled: true }),
      avaliacao: new FormControl({ value: '', disabled: true }),
      sexo: new FormControl({ value: '', disabled: true }),
    })
  }

  percorrerFormulario() {
    var UserArray = Object.entries(this.formulario.controls);
    UserArray.forEach(element => {
      console.log(element[1].value);
    });
    console.log(UserArray);
  }

  editarCamposPerfil() {
    this.habilitaCamposFormulario();
    this.toggleShowBtnEdit();
  } v

  toggleShowBtnEdit() {
    this.editingFields = !this.editingFields;
  }

  cancelarAlteracaoPerfil() {
    this.desabilitaCamposFormulario();
    this.toggleShowBtnEdit();
    this.percorrerFormulario();
  }

  salvarAlteracao(newUserInfo: FormBuilder) {

    let oldsuarioInfo:Usuario = this.usuarioInfo;
    this.newUsuarioInfo = this.formulario.value;

    //size = 20
    let sizeOldUsuarioInfo:number = Object.keys(oldsuarioInfo).length;
    //size = 17
    let sizeNewUsuarioInfo:number = Object.keys(newUserInfo).length;

    //getting keys of this.usuarioInfo/Old and newUserInfo
    let keysOldUserInfo = Object.keys(this.usuarioInfo);
    let keysNewUserInfo = Object.keys(newUserInfo);

    //getting  values of NewUserInfo and OldUserInfo
    let valuesOldUserInfo = Object.values(this.usuarioInfo);
    let valuesNewUserInfo = Object.values(newUserInfo);

    //getting values old to variable new
    this.newUsuarioInfo = oldsuarioInfo;

    for(let i=0; i<sizeOldUsuarioInfo; i++){
      for(let j=0; j<sizeNewUsuarioInfo; j++){
        if(keysOldUserInfo[i] == keysNewUserInfo[j]){
          if(valuesNewUserInfo[j] != '' && valuesNewUserInfo[j] != null 
              && valuesNewUserInfo[j] != undefined && valuesNewUserInfo[j] != valuesOldUserInfo[i]){
                this.newUsuarioInfo[keysNewUserInfo[j]] = valuesNewUserInfo[j]
              }
        }
      }
    }
    this.usuarioService.addUsuario(this.newUsuarioInfo).subscribe(response => {
      let res:Response = <Response>response;
      if(res.codigo == 1){
        alert("Perfil atualizado com sucesso.");
        //update ngModel of components
        this.usuarioInfo = this.newUsuarioInfo;
      }else{
        alert(res.mensagem);
      }
    });

    this.desabilitaCamposFormulario();
    this.toggleShowBtnEdit();
  }

  habilitaCamposFormulario() {
    this.formulario.controls.nome.enable();
    this.formulario.controls.sobrenome.enable();
    this.formulario.controls.senha.enable();
    this.formulario.controls.email.enable();
    this.formulario.controls.facebook.enable();
    this.formulario.controls.whatsapp.enable();
    this.formulario.controls.telefone.enable();
    this.formulario.controls.profissao.enable();
    this.formulario.controls.experiencia.enable();
    this.formulario.controls.cpf_cnpj.enable();
    this.formulario.controls.endereco.enable();
    this.formulario.controls.complemento.enable();
    this.formulario.controls.cidade.enable();
    this.formulario.controls.estado.enable();
    this.formulario.controls.cep.enable();
    this.formulario.controls.avaliacao.enable();
    this.formulario.controls.sexo.enable();
  }

  desabilitaCamposFormulario() {
    this.formulario.controls.nome.disable();
    this.formulario.controls.sobrenome.disable();
    this.formulario.controls.senha.disable();
    this.formulario.controls.email.disable();
    this.formulario.controls.facebook.disable();
    this.formulario.controls.whatsapp.disable();
    this.formulario.controls.telefone.disable();
    this.formulario.controls.profissao.disable();
    this.formulario.controls.experiencia.disable();
    this.formulario.controls.cpf_cnpj.disable();
    this.formulario.controls.endereco.disable();
    this.formulario.controls.complemento.disable();
    this.formulario.controls.cidade.disable();
    this.formulario.controls.estado.disable();
    this.formulario.controls.cep.disable();
    this.formulario.controls.avaliacao.disable();
    this.formulario.controls.sexo.disable();
  }

  onFileSelected(event) {
    // this.selectedFile = <File>event.target.files[0];
    //const fd = new FormData();
    // fd.append('iamge',this.selectedFile,this.selectedFile.name);
  }

  recebendoParametroInfoUsuario() {
    this.usuarioInfo.idRole = this.activatedRoute.snapshot.queryParams.idRole;
    this.usuarioInfo.idUsuario = this.activatedRoute.snapshot.queryParams.idUsuario;
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
    this.usuarioInfo.telefone = this.activatedRoute.snapshot.queryParams.telefone;
    this.usuarioInfo.profissao = this.activatedRoute.snapshot.queryParams.profissao;

    if (this.usuarioInfo.urlFacebook == null || this.usuarioInfo.urlFacebook == "") {
      this.usuarioInfo.urlFacebook = "Facebook não cadastrado.";
    } else {
      this.usuarioInfo.urlFacebook = this.activatedRoute.snapshot.queryParams.urlFacebook;
    }
    if (this.usuarioInfo.hasWhatsapp == null || this.usuarioInfo.hasWhatsapp == "") {
      this.usuarioInfo.hasWhatsapp = "Whatsapp não cadastrado.";
    } else {
      this.usuarioInfo.hasWhatsapp = this.activatedRoute.snapshot.queryParams.hasWhatsapp;
    }

    if (this.usuarioInfo.idRole == 3) {
      this.usuarioInfo.experiencia = "Empregador";
    } else if (this.usuarioInfo.idRole == 2) {
      if (this.usuarioInfo.experiencia == null || this.usuarioInfo.experiencia == "") {
        this.usuarioInfo.experiencia = "Sem experiência.";
      } else {
        this.usuarioInfo.experiencia = this.activatedRoute.snapshot.queryParams.experiencia;
      }
    }

    if (this.usuarioInfo.avaliacao == null || this.usuarioInfo.avaliacao == "") {
      this.usuarioInfo.avaliacao = "Sem avaliação recebida.";
    } else {
      this.usuarioInfo.avaliacao = this.activatedRoute.snapshot.queryParams.avaliacao;
    }
    this.usuarioInfo.sexo = this.activatedRoute.snapshot.queryParams.sexo;
  }

  excluirConta(id: number) {
    console.log(id);
    this.usuarioService.deleteUsuario(id).subscribe(response => {
      let res: Response = <Response>response;
      if (res.codigo == 1) {
        alert(res.mensagem);
        //apagando os registros do localstorage
        this.logout();
        //

        this.router.navigate(['/login']);
      } else {
        alert(res.mensagem)
      }
    })
  }

  logout() {
    localStorage.removeItem('Usuario');
    localStorage.removeItem('permissoes');
    localStorage.removeItem('nomeChat');
    localStorage.removeItem('sobrenomeChat');
    this.router.navigate(['login'], { queryParams: { logout: true } })
      .then(() => {
        window.location.reload();
      });
  }

  getRatingUser(id_user: Number) {
    this.avaliacoesService.getAvaliationsUser(id_user).subscribe(response => {
      this.avaliacoes = response;
      this.getAverageAvaliation(this.avaliacoes);
    });
  }

  getAverageAvaliation(avaliacoes: Avaliacoes) {
    this.media = (avaliacoes.compromisso + avaliacoes.disciplina +
      avaliacoes.organizacao + avaliacoes.limpeza) / 4;
    this.media = parseFloat(this.media.toFixed(2));
  }

}
