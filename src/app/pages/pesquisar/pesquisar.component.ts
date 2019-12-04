import { Usuario } from './../../system-objects/usuario-model';
import { RoleEnum } from './../../system-objects/role-enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../../services/funcionario/funcionario';
import { Response } from '../../services/response';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Estados } from '../../util/estados';
import { Experiencia } from '../../util/experiencia';
import { Sexo } from '../../util/sexo';
import { PesquisaFuncionarioService } from '../../services/Pesquisa/PesquisaFuncionarioService';
import { PesquisaFuncionario } from '../../services/Pesquisa/PesquisaFuncionario';
import { InfoFuncionarioComponent } from '../info-funcionario/info-funcionario.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html'
})
export class PesquisarComponent implements OnInit {

  private usuarios: Usuario[] = new Array();
  private parametrosPesquisa: String[] = new Array();
  private usuariosFuncionarios: Usuario[] = new Array();
  private titulo: string;
  private formulario: FormGroup;
  private pesquisaFuncionario: PesquisaFuncionario = new PesquisaFuncionario();
  private usuarioFuncionario: Usuario = new Usuario();
  private inforFuncionario: InfoFuncionarioComponent;
  private cracteresPermitidos: Number = 0;
  private resultadoVerificacao: Number = 0;

  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private pesquisaFuncionarioService: PesquisaFuncionarioService,
    private router: Router
  ) {

    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = "Pesquisar Funcionários";
    //busca todas as pessoas registradas na tabela ao iniciar a página.
    this.usuarioService.getUsuarioPorPerfil(RoleEnum.Funcionario).subscribe(res => {
      this.usuarios = res;
    });
  }

  estados = [
    new Estados(0, "Selecione"),
    new Estados(1, 'Rio de Janeiro'),
    new Estados(2, 'São Paulo'),
    new Estados(3, 'Bahia'),
  ];

  experiencias = [
    new Experiencia(0, "Selecione"),
    new Experiencia(1, 'Sem Experiência'),
    new Experiencia(2, 'até 6 meses'),
    new Experiencia(3, '6 a 12 meses'),
    new Experiencia(4, '1 a 2 anos'),
    new Experiencia(5, '2 anos e meio'),
  ];

  sexos = [
    new Sexo(0, "Selecione"),
    new Sexo(1, 'Feminino'),
    new Sexo(2, 'Masculino'),
  ];

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
      sobrenome: new FormControl('', [Validators.minLength(3), Validators.maxLength(40)]),
      estado: new FormControl(''),
      cidade: new FormControl('', Validators.maxLength(15)),
      sexo: new FormControl(''),
      experiencia: new FormControl('')
    });
  }

  limparCampos() {
    (<HTMLSelectElement>document.getElementById('campoNomePesquisar')).value = "";
    (<HTMLSelectElement>document.getElementById('campoSobreNomePesquisar')).value = "";
    (<HTMLSelectElement>document.getElementById('campoEstadoPesquisar')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoCidadePesquisar')).value = "";
    (<HTMLSelectElement>document.getElementById('campoSexoPesquisar')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoExperienciaPesquisar')).value = "Selecione";
  }

  pesquisar() {

    this.usuarioFuncionario = this.formulario.value;

    let todosCamposVazios: Boolean = this.verificarCamposVazios(this.usuarioFuncionario);
    if (todosCamposVazios == true) {
      alert("Preencha pelo menos um campo para pesquisar.");
    } else {
      this.pesquisaFuncionarioService.buscar(this.usuarioFuncionario)
        .subscribe(response => {
          if (response == 0) {
            alert("Não há registros dessa pesquisa.");
            this.limparCampos();
          } else {
            this.usuarios = response;
            this.limparCampos();
          }
        },
          (erro) => {
            alert(erro);
          });
    }
  }

  excluir(codigo: number, index: number): void {
    if (confirm("Deseja realmente excluir esse funcionário?")) {
      this.usuarioService.deleteUsuario(codigo).subscribe(response => {
        let res: Response = <Response>response;
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.usuarios.splice(index, 1);
        }
        else {
          alert(res.mensagem);
        }
      },
        (erro) => {
          alert(erro);
        });
    }
  }

  infoFuncionario(funcionario: Funcionario) {
    console.log(funcionario);
    this.router.navigate(['infoFuncionario'], { queryParams: funcionario });
  }

  verificaCamposVazios(usuario: Usuario) {
    if (
      usuario.cidade == "" || usuario.cidade == undefined || usuario.cidade == null
      && usuario.estado == "" || usuario.estado == undefined || usuario.estado == null || usuario.estado == "Selecione"
      && usuario.experiencia == "" || usuario.experiencia == undefined || usuario.experiencia == null
      && usuario.nome == "" || usuario.nome == undefined || usuario.nome == null
      && usuario.sexo == "" || usuario.sexo == undefined || usuario.sexo == null || usuario.sexo == "Selecione"
      && usuario.sobrenome == "" || usuario.sobrenome == undefined || usuario.sobrenome == null || usuario.experiencia == "Selecione"

    ) {
      alert("Prrencha algum campo para pesquisar.");
      console.log(usuario);
      //busca todas as pessoas registradas na tabela ao iniciar a página.
      this.usuarioService.getUsuarioPorPerfil(RoleEnum.Funcionario).subscribe(res => {
        this.usuarios = res;
      });
      return 0;
    } else {
      return 1;
    }
  }

  verificarCamposVazios(camposPesquisa: Usuario) {
    if (camposPesquisa.nome.length == 0
      && camposPesquisa.sobrenome.length == 0
      && camposPesquisa.estado.length == 0
      && camposPesquisa.cidade.length == 0
      && camposPesquisa.sexo.length == 0
      && camposPesquisa.experiencia.length == 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
