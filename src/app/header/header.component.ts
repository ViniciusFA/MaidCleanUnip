import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from './../system-objects/usuario-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  shareObj = {
    href: "FACEBOOK-SHARE-LINK",
    hashtag: "#FACEBOOK-SHARE-HASGTAG"
  };

  private formulario: FormGroup;
  private usuario: Usuario;
  private usuarioLoginInfo:String;
  private objectUser:Object;
  private objectUser2:Usuario[] = new Array();

  private usuarioInfo:Usuario = new Usuario();

  mostrarMenu: boolean = false;
  acessaAnuncie: Boolean = false;
  acessaOportunidadeModal: Boolean = false;
  acessaFuncionario: Boolean = false;
  acessaLegislacao: Boolean = false;
  acessaOportunidade: Boolean = false;
  acessaCadastro: Boolean = false;
  acessaEntrar: Boolean = false;
  acessaLogout: Boolean = false;

  constructor(private router: Router,
              private usuarioService: UsuarioService) {}

  ngOnInit() {
    let permissoes = JSON.parse(localStorage.getItem('permissoes'));
    if (permissoes === null || permissoes === undefined) {
      this.acessaAnuncie = false;
      this.acessaFuncionario = false;
      this.acessaLegislacao = false;
      this.acessaOportunidade = false;
      this.acessaOportunidadeModal = false;
      this.acessaLogout = false;
      this.acessaEntrar = true;
      this.acessaCadastro = true;
    } else {
      this.acessaAnuncie = permissoes.acessaAnuncie;
      this.acessaFuncionario = permissoes.acessaFuncionario;
      this.acessaLegislacao = permissoes.acessaLegislacao;
      this.acessaOportunidade = permissoes.acessaOportunidade;
      this.acessaOportunidadeModal = permissoes
      this.acessaLogout = permissoes.acessaLogout;
      this.acessaEntrar = permissoes.acessaEntrar;
      this.acessaCadastro = permissoes.acessaCadastro;
    }
  }


  receberParamLogin(mostrarMenu: boolean) {
    this.mostrarMenu = mostrarMenu;
  }

  logout() {
    localStorage.removeItem('permissoes');
    this.router.navigate(['login'], { queryParams: { logout: true } })
      .then(() => {
        window.location.reload();
      });
  }

 

  infoPerfilUsuario(){
    var objectUsuario = JSON.parse(localStorage.getItem('Usuario'));
    this.usuarioLoginInfo = objectUsuario.login;
    this.usuarioService.getUsuarioPorLogin(this.usuarioLoginInfo).subscribe(res =>{
      var resposta = res; 

      //pega informacoes do usuario para enviar para a page perfil  
      this.usuarioInfo = resposta;
      this.usuarioInfo.idUsuario = resposta.idUsuario;
      this.usuarioInfo.nome = resposta.nome;
      this.usuarioInfo.sobrenome = resposta.sobrenome;
      this.usuarioInfo.login = resposta.login;
      this.usuarioInfo.senha = resposta.senha;
      this.usuarioInfo.email = resposta.email;
      this.usuarioInfo.urlFacebook = resposta.facebook;
      this.usuarioInfo.hasWhatsapp = resposta.hasWhatsapp;
      this.usuarioInfo.telefone = resposta.telefone;
      this.usuarioInfo.profissao = resposta.profissao;
      this.usuarioInfo.experiencia = resposta.experiencia;
      this.usuarioInfo.cpf_cnpj = resposta.cpf_cnpj;      
      this.usuarioInfo.endereco = resposta.endereco;
      this.usuarioInfo.complemento = resposta.complemento;
      this.usuarioInfo.cidade = resposta.cidade;
      this.usuarioInfo.estado = resposta.estado;
      this.usuarioInfo.cep = resposta.cep;
      this.usuarioInfo.id_avaliacao = resposta.avaliacao;
      this.usuarioInfo.sexo = resposta.sexo;
      this.usuarioInfo.idRole = resposta.idRole;
     // this.usuarioInfo.mediaAvaliacao = resposta.
      this.enviarParametrosUsuario(this.usuarioInfo);
      //queryparams jogar na pagina d eperfil
    })
  }

  enviarParametrosUsuario(usuarioInfo:Usuario){
    console.log(this.usuarioInfo);
    this.router.navigate(['/perfil'], { queryParams: this.usuarioInfo })
    // this.router.navigate(['infoFuncionario'], { queryParams: funcionario });
  }
  

}
