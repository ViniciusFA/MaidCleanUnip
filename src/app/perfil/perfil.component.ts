import { Experiencia } from './../util/experiencia';
import { UsuarioCamposTela } from './../system-objects/usuario-campos-model';
import { ExperienciaService } from './../services/experienciaService/experiencia.service';
import { LocalidadeService } from './../services/localidade/localidade.service';
import { Cidade } from './../system-objects/cidade-model';
import { Estado } from './../system-objects/estado-model';
import { Response } from './../services/response';
import { AvaliacoesService } from './../services/avaliacoes/avaliacoes.service';
import { UsuarioService } from './../services/usuario/usuario.service';
import { Usuario } from './../system-objects/usuario-model';
import { Avaliacoes } from './../system-objects/avaliacoes-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  private formulario: FormGroup;
  private editingFields: boolean = true;
  private usuarioInfo: Usuario = new Usuario();
  private media: number = 0.0;
  private newUsuarioInfo: Usuario = new Usuario();
  private oldsuarioInfo: Usuario = new Usuario();
  private cities: Array<Cidade>;
  private states: Array<Estado>;
  private experiencias: Array<String> = new Array;
  private valuesCamposTela: UsuarioCamposTela = new UsuarioCamposTela();
  private estado: Estado = new Estado();
  private cities2: Cidade = new Cidade();

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private avaliacoesService: AvaliacoesService,
    private usuarioService: UsuarioService,
    private router: Router,
    private localidadeService: LocalidadeService,
    private experienciaService: ExperienciaService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.carregarCampos();
    //this.getRatingUser(this.usuarioInfo.idUsuario);   
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
      estado: new FormControl({ value: '', disabled: true }),
      cidade: new FormControl({ value: '', disabled: true }),
      cep: new FormControl({ value: '', disabled: true }),
      avaliacao: new FormControl({ value: '', disabled: true }),
      sexo: new FormControl({ value: '', disabled: true }),
    })
  }


  carregarCampos() {
    this.getStates();
    this.getCities();
    this.getExperience();
    this.recebendoParametroInfoUsuario();
    this.getIdNameUser();

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
  }

  teste() {
    alert("teste");
  }

  salvarAlteracao(newUserInfo: FormBuilder) {

    this.oldsuarioInfo = this.usuarioInfo;

    this.valuesCamposTela = this.formulario.value;

    //size = 20
    let sizeOldUsuarioInfo: number = Object.keys(this.oldsuarioInfo).length;
    //size = 17
    let sizeNewUsuarioInfo: number = Object.keys(newUserInfo).length;

    //getting keys of this.usuarioInfo/Old and newUserInfo
    let keysOldUserInfo = Object.keys(this.usuarioInfo);
    let keysNewUserInfo = Object.keys(newUserInfo);

    //getting  values of NewUserInfo and OldUserInfo
    let valuesOldUserInfo = Object.values(this.usuarioInfo);
    let valuesNewUserInfo = Object.values(newUserInfo);

    //getting values old to variable new
    this.newUsuarioInfo = this.oldsuarioInfo;
    let experienciaObj: Experiencia;
    let cidadeObj: Cidade = new Cidade;
    let estadoObj: Estado = new Estado();


    for (let i = 0; i < sizeOldUsuarioInfo; i++) {
      for (let j = 0; j < sizeNewUsuarioInfo; j++) {
        if (keysOldUserInfo[i] == keysNewUserInfo[j]) {
          if (valuesNewUserInfo[j] != '' && valuesNewUserInfo[j] != null
            && valuesNewUserInfo[j] != undefined && valuesNewUserInfo[j] != valuesOldUserInfo[i]) {

            if (this.newUsuarioInfo[keysNewUserInfo[j]] === this.newUsuarioInfo.experiencia) {
              this.newUsuarioInfo.experiencia.idExperiencia = valuesNewUserInfo[j];
              this.newUsuarioInfo.experiencia.tempo = "";

            } else if (this.newUsuarioInfo[keysNewUserInfo[j]] === this.newUsuarioInfo.estado) {

              this.newUsuarioInfo.estado.id_estado = valuesNewUserInfo[j];
              this.newUsuarioInfo.estado.nome_estado = "";
              this.newUsuarioInfo.cidade.id_estado = this.newUsuarioInfo.estado

            } else if (this.newUsuarioInfo[keysNewUserInfo[j]] === this.newUsuarioInfo.cidade) {
              this.newUsuarioInfo.cidade.id_cidade = valuesNewUserInfo[j];
              this.newUsuarioInfo.cidade.nome_cidade = "";

            } else
              this.newUsuarioInfo[keysNewUserInfo[j]] = valuesNewUserInfo[j];
          }
        }
      }
    }


    this.usuarioService.addUsuario(this.newUsuarioInfo).subscribe(response => {
      let res: Response = <Response>response;
      if (res.codigo == 1) {
        alert("Perfil atualizado com sucesso.");
        //update ngModel of components
        this.usuarioInfo = this.newUsuarioInfo;
      } else {
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
    this.formulario.controls.estado.enable();
    this.formulario.controls.cep.enable();
    this.formulario.controls.avaliacao.enable();
    this.formulario.controls.sexo.enable();

    if (this.formulario.controls['estado'].value == "Selecione" ||
      this.formulario.controls['estado'].value == "" ||
      this.formulario.controls['estado'].value == null ||
      this.formulario.controls['estado'].value == undefined)
      this.formulario.controls.cidade.disable();
    else
      this.formulario.controls.cidade.enable();
  }

  desabilitaCamposFormulario() {
    let sizeFormulario: number = Object.keys(this.formulario).length;
    for (let i = 0; i < sizeFormulario; i++) {
    }
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
    let idUser = this.activatedRoute.snapshot.queryParams.idUsuario;

    this.usuarioService.getUsuarioById(idUser).subscribe(data => {
      this.usuarioInfo = data;
      let id_estado: number = this.usuarioInfo.estado.id_estado;

      if (this.usuarioInfo.facebook == null || this.usuarioInfo.facebook == undefined) {
        this.usuarioInfo.facebook = "Facebook não cadastrado.";
      }

      if (this.usuarioInfo.hasWhatsapp == null || this.usuarioInfo.hasWhatsapp == undefined
        || this.usuarioInfo.hasWhatsapp != "1") {
        this.usuarioInfo.hasWhatsapp = "Não";
      } else
        this.usuarioInfo.hasWhatsapp = "Sim";
    })
    this.getAverageAvaliation(this.usuarioInfo.avaliacao);
  }

  excluirConta(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(response => {
      let res: Response = <Response>response;
      if (res.codigo == 1) {
        alert(res.mensagem);
        //apagando os registros do localstorage
        this.logout();
        this.router.navigate(['/login']);
      } else {
        alert(res.mensagem)
      }
    })
  }

  getIdNameUser() {
    localStorage.setItem("IdUser", JSON.stringify(this.usuarioInfo.idUsuario))
    localStorage.setItem("NameUser", JSON.stringify(this.usuarioInfo.nome));
  }

  logout() {
    localStorage.removeItem('Usuario');
    localStorage.removeItem('permissoes');
    localStorage.removeItem('nomeChat');
    localStorage.removeItem('sobrenomeChat');
    localStorage.removeItem('NameUser');
    localStorage.removeItem('IdUser');
    this.router.navigate(['login'], { queryParams: { logout: true } })
      .then(() => {
        window.location.reload();
      });
  }

  getStates() {
    this.localidadeService.getStates().subscribe(data => {
      this.states = data;
    })
  }

  getExperience() {
    this.experienciaService.getExperiences().subscribe(res => {
      this.experiencias = res;
    })
  }

  getCitiesWithIdState(id_estado: any) {
    if (id_estado == "Selecione" || id_estado == null || id_estado == undefined) {
      this.formulario.controls['cidade'].setValue("Selecione");
      this.formulario.controls['cidade'].disable();
    } else {
      this.localidadeService.getCitysWithIdStates(id_estado).subscribe(data => {
        this.cities = data;   
      });
      this.formulario.controls.cidade.enable();
    }
  }

  getCities() {
    this.localidadeService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  getAverageAvaliation(avaliacoes: Avaliacoes) {
    this.media = (avaliacoes.compromisso + avaliacoes.disciplina +
      avaliacoes.organizacao + avaliacoes.limpeza) / 4;
    this.media = parseFloat(this.media.toFixed(2));
  }

}
