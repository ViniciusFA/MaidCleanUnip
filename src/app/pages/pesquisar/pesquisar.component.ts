import { Stars } from './../../system-objects/stars-model';
import { Experiencias } from 'src/app/system-objects/experiencias-model';
import { ExperienciaService } from './../../services/experienciaService/experiencia.service';
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
  private allStars:Array<Stars> = new Array;
  private experiencias: Array<String> = new Array;
  private camposPesquisa: PesquisaFuncionario = new PesquisaFuncionario();

  @ViewChild('cidade', { static: false }) cidadeInput: ElementRef;

  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private pesquisaFuncionarioService: PesquisaFuncionarioService,
    private router: Router,
    private localidadeService: LocalidadeService,
    private avaliacoesAservice: AvaliacoesService,
    private experienciaService: ExperienciaService) {
    this.configurarFormulario();
  }

  ngOnInit() {
    this.titulo = "Pesquisar Funcionários"; 
    this.pegarUsuariosPorPerfil();   
    this.carregarCampos();    
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
      sobrenome: new FormControl('', [Validators.minLength(3), Validators.maxLength(40)]),
      estado: new FormControl(''),
      cidade: new FormControl({ value: '', disabled: true }),
      star: new FormControl(''),
      experiencia: new FormControl('')
    });
  }

  carregarCampos() {
    this.getStates();
    this.getAllAvaliation();
    this.getStars();
    this.getExperience();
  }

  pegarUsuariosPorPerfil() {
    this.usuarioService.getUsuariosPorPerfil(RoleEnum.Funcionario).subscribe(res => {
      this.usuarios = res;
      console.log(this.usuarios);
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    //atualiza pagina de itens atual
    this.pageOfItems = pageOfItems;
    console.log(this.usuarios);
  }

  limparCampos() {
    this.formulario.controls['nome'].setValue("");
    this.formulario.controls['sobrenome'].setValue("");
    this.formulario.controls['estado'].setValue("");
    this.formulario.controls['cidade'].setValue("");
    this.formulario.controls['star'].setValue("");
    this.formulario.controls['experiencia'].setValue("");
    (<HTMLSelectElement>document.getElementById('campoEstadoPesquisar')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoCidadePesquisar')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoCidadePesquisar')).disabled = true;
    (<HTMLSelectElement>document.getElementById('campoAvaliacaoPesquisar')).value = "Selecione";
    (<HTMLSelectElement>document.getElementById('campoExperienciaPesquisar')).value = "Selecione";
  }

  pesquisar() {
    //this.usuarioFuncionario = this.formulario.value;

    let CamposPesquisa: PesquisaFuncionario = this.formulario.value;

    this.todosCamposVazios = this.verificarCamposVazios(CamposPesquisa);

    if (this.todosCamposVazios) {
      alert("Preencha pelo menos um campo para pesquisar.");
      this.pegarUsuariosPorPerfil();
    } else {

      console.log(CamposPesquisa);

      CamposPesquisa.idRole = 2;

      //Atualizando o usuario com os dado do campo NOME
      if (CamposPesquisa.nome == null || CamposPesquisa.nome == undefined)
        CamposPesquisa.nome = "";

      //Atualizando o usuario com os dado do campo SOBRENOME
      if (CamposPesquisa.sobrenome == null || CamposPesquisa.sobrenome == undefined)
        CamposPesquisa.sobrenome = "";

      //Atualizando o usuario com os dado do campo ESTADO
      if (CamposPesquisa.estado == null || CamposPesquisa.estado == undefined ||
        CamposPesquisa.estado == "Selecione" || CamposPesquisa.estado == "undefined")
        CamposPesquisa.estado = "";

      //Atualizando o usuario com os dado do campo CIDADE
      if (CamposPesquisa.cidade == null || CamposPesquisa.cidade == undefined ||
        CamposPesquisa.cidade == "Selecione" || CamposPesquisa.cidade == "undefined")
        CamposPesquisa.cidade = "";

      //Atualizando o usuario com os dado do campo AVALIAÇÃO / ESTRELA
      if (CamposPesquisa.star == null || CamposPesquisa.star == undefined ||
        CamposPesquisa.star == "Selecione" || CamposPesquisa.cidade == "undefined")
        CamposPesquisa.star = "";

      //Atualizando o usuario com os dado do campo EXPERIÊNCIA
      if (CamposPesquisa.experiencia == null || CamposPesquisa.experiencia == undefined ||
        CamposPesquisa.experiencia == "Selecione" || CamposPesquisa.cidade == "undefined")
        CamposPesquisa.experiencia = "";

      this.pesquisaFuncionarioService.buscar(CamposPesquisa)
        //this.pesquisaFuncionarioService.buscar(this.usuarioFuncionario)
        .subscribe(response => {
          if (response == 0) {
            alert("Não há registros dessa pesquisa.");
          } else {
            this.usuarios = response;
            console.log(this.usuarios);
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

  verificarCamposVazios(camposPesquisa: PesquisaFuncionario) {
    if ((camposPesquisa.nome == null || camposPesquisa.nome == "")
      && (camposPesquisa.sobrenome == null || camposPesquisa.sobrenome == "")
      && (camposPesquisa.estado == null || camposPesquisa.estado == "")
      && (camposPesquisa.cidade == null || camposPesquisa.cidade == "")
      && (camposPesquisa.star == null || camposPesquisa.star == undefined)
      && (camposPesquisa.experiencia == null || camposPesquisa.experiencia == undefined))
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

  getStars(){
    this.avaliacoesAservice.getStars().subscribe(data => {
      this.allStars = data;
      console.log(this.allStars);
    })
  }

  getAllAvaliation() {
    this.avaliacoesAservice.getAllAvaliations().subscribe(res => {
      this.allAvaliations = res;
      console.log(this.allAvaliations);
    })
    this.getAverageAvaliation();
  }

  getAverageAvaliation() {
    this.avaliacoesAservice.getAverage().subscribe(res => {
      this.mediaArray = res;
    })
  }

  getExperience() {
    this.experienciaService.getExperiences().subscribe(res => {
      this.experiencias = res;
      console.log(this.experiencias);
    })
  }


}
