import { Avaliacoes } from './../../system-objects/avaliacoes-model';
import { AvaliacoesService } from './../../services/avaliacoes/avaliacoes.service';
import { Estado } from './../../system-objects/estado-model';
import { Cidade } from './../../system-objects/cidade-model';
import { LocalidadeService } from './../../services/localidade/localidade.service';
import { NgbdRatingTemplate } from '../../components/rating-template/rating-template.component';

import { Usuario } from './../../system-objects/usuario-model';
import { RoleEnum } from './../../system-objects/role-enum';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../../services/funcionario/funcionario';
import { Response } from '../../services/response';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Estados } from '../../util/estados';
import { Experiencia } from '../../util/experiencia';
import { PesquisaFuncionarioService } from '../../services/Pesquisa/PesquisaFuncionarioService';
import { PesquisaFuncionario } from '../../services/Pesquisa/PesquisaFuncionario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html'
})

export class PesquisarComponent implements OnInit {
  private titulo: string;
  private formulario: FormGroup;
  private usuarioFuncionario: Usuario = new Usuario();
  private usuarios: Array<any>;
  private pageOfItems: Array<any>;
  private todosCamposVazios: Boolean = false;
  private cities: Array<Cidade>;
  private states: Array<Estado>;
  private mediaArray: Array<number> = new Array;
  private allAvaliations: Array<Avaliacoes> = new Array;

  @ViewChild('cidade', { static: false }) cidadeInput: ElementRef;

  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private pesquisaFuncionarioService: PesquisaFuncionarioService,
    private router: Router,
    private localidadeService: LocalidadeService,
    private avaliacoesAservice: AvaliacoesService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = "Pesquisar Funcionários";
    this.pegarUsuariosPorPerfil();
    this.getAllAvaliation();
    this.getStates();
  }

  experiencias = [
    new Experiencia(0, "Selecione"),
    new Experiencia(1, 'Sem Experiência'),
    new Experiencia(2, 'até 6 meses'),
    new Experiencia(3, '6 a 12 meses'),
    new Experiencia(4, '1 a 2 anos'),
    new Experiencia(5, '2 anos e meio'),
  ];

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
      sobrenome: new FormControl('', [Validators.minLength(3), Validators.maxLength(40)]),
      estado: new FormControl(''),
      cidade: new FormControl({ value: '', disabled: true }),
      avaliacao: new FormControl(''),
      experiencia: new FormControl('')
    });
  }

  pegarUsuariosPorPerfil() {
    this.usuarioService.getUsuariosPorPerfil(RoleEnum.Funcionario).subscribe(res => {
      this.usuarios = res;
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    //atualiza pagina de itens atual
    this.pageOfItems = pageOfItems;
  }

  limparCampos() {
    this.formulario.controls['nome'].setValue("");
    this.formulario.controls['sobrenome'].setValue("");
    this.formulario.controls['estado'].setValue("");
    this.formulario.controls['cidade'].setValue("");
    this.formulario.controls['avaliacao'].setValue("");
    this.formulario.controls['experiencia'].setValue("");
    (<HTMLSelectElement>document.getElementById('campoEstadoPesquisar')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoSexoPesquisar')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoExperienciaPesquisar')).value = "Selecione";
  }

  pesquisar() {
    this.usuarioFuncionario = this.formulario.value;
    this.todosCamposVazios = this.verificarCamposVazios(this.usuarioFuncionario);
    if (this.todosCamposVazios) {
      alert("Preencha pelo menos um campo para pesquisar.");
      this.pegarUsuariosPorPerfil();
    } else {
      this.pesquisaFuncionarioService.buscar(this.usuarioFuncionario)
        .subscribe(response => {
          if (response == 0) {
            alert("Não há registros dessa pesquisa.");
          } else {
            this.usuarios = response;
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
    this.router.navigate(['infoFuncionario'], { queryParams: funcionario });
  }

  verificarCamposVazios(camposPesquisa: Usuario) {
    if ((camposPesquisa.nome == null || camposPesquisa.nome == "")
      && (camposPesquisa.sobrenome == null || camposPesquisa.sobrenome == "")
      && (camposPesquisa.estado == null || camposPesquisa.estado == "")
      && (camposPesquisa.cidade == null || camposPesquisa.cidade == "")
      && (camposPesquisa.id_avaliacao == null || camposPesquisa.id_avaliacao == undefined)
      && (camposPesquisa.experiencia == null || camposPesquisa.experiencia == ""))
      return true;
    else
      return false;
  }

  getCities(id_estado: any) {
    if (id_estado == "Selecione") {
      this.cities = undefined;
      this.formulario.controls['cidade'].setValue("Selecione");
      this.formulario.controls['cidade'].disable();
    } else {
      this.localidadeService.getCitys(id_estado).subscribe(data => {
        this.cities = data;
      });
      this.formulario.controls['cidade'].setValue("Selecione");
      this.formulario.controls['cidade'].enable();
    }
  }

  getStates() {
    this.localidadeService.getStates().subscribe(data => {
      this.states = data;
    })
  }

  getAllAvaliation() {
    this.avaliacoesAservice.getAllAvaliations().subscribe(res => {
      this.allAvaliations = res;
    })
    this.getAverageAvaliation();
  }

  getAverageAvaliation() {
    this.avaliacoesAservice.getAverage().subscribe(res => {
      this.mediaArray = res;
    })
  }



}
