import { Estado } from './../../../system-objects/estado-model';
import { Cidade } from './../../../system-objects/cidade-model';
import { LocalidadeService } from './../../../services/localidade/localidade.service';
import { RoleEnum } from './../../../system-objects/role-enum';
import { Usuario } from './../../../system-objects/usuario-model';
import { Component, OnInit, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpregadorService } from '../../../services/empregador/empregador.service';
import { Empregador } from 'src/app/services/empregador/empregador';
import { Response } from '../../../services/response';
import { FormGroup, FormControl ,FormBuilder, Validators } from '@angular/forms';
import { Sexo } from 'src/app/util/sexo';
import { Estados } from 'src/app/util/estados';
import { Residencia } from 'src/app/util/residencia';

@Component({
  selector: 'app-cadastro-empregador',
  templateUrl: './cadastro-empregador.component.html'
})
export class CadastroEmpregadorComponent implements OnInit {

  empregador: Empregador = new Empregador();
  formulario: FormGroup;
  private valorInteiro: Number = null;
  private cities: Array<Cidade>;
  private states: Array<Estado>;

  constructor(private empregadorService: EmpregadorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private localidadeService: LocalidadeService) { }

  ngOnInit() {
    this.configurarFormulario();
    this.getStates();
  }

  estados = [
    new Estados(0, 'Estados'),
    new Estados(1, 'Rio de Janeiro'),
    new Estados(2, 'São Paulo'),
  ];

  sexos = [
    new Sexo(0, 'Sexo'),
    new Sexo(1, 'Feminino'),
    new Sexo(2, 'Masculino'),
  ];

  residencias = [
    new Residencia(0, 'Residência'),
    new Residencia(1, 'Apartamento'),
    new Residencia(2, 'Casa'),
  ];

  configurarFormulario() {
    this.formulario = this.formBuilder.group({

      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      sobrenome: new FormControl('', [Validators.minLength(3), Validators.maxLength(40)]),
      login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      avaliacao: new FormControl('', [Validators.email, Validators.maxLength(50)]),
      sexo: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.maxLength(50)]),
      telefone: new FormControl('', Validators.maxLength(11)),
      residencia: new FormControl(''),
      cpf_cnpj: new FormControl('', Validators.maxLength(20)),
      endereco: new FormControl('', Validators.maxLength(100)),
      complemento: new FormControl('', Validators.maxLength(40)),
      cidade: new FormControl({ value: '', disabled: true }, Validators.maxLength(30)),
      estado: new FormControl(''),
      cep: new FormControl('', Validators.maxLength(8))
    });
  }

  cadastrar(): void {
    this.empregador = new Empregador();
  }

  salvar() {

    let usuario = this.formulario.value as Usuario;

    if (usuario.sexo == "Masculino") {
      usuario.sexo = 'M';
    } else {
      usuario.sexo = 'F';
    }

    usuario.idRole = RoleEnum.Empregador;
    usuario.profissao = "Empregador";
    console.log("usuario.idRole: " + usuario.idRole);

    this.empregadorService.criarEmpregador(usuario)
      .subscribe(response => {
        let res: Response = <Response>response;

        if (res.codigo == 1) {
          alert(res.mensagem);
          this.formulario.reset();
          this.router.navigate(['login']);
        } else {
          alert(res.mensagem);
        }
      }
        , (erro) => {
          alert(erro);
        });
  }

  voltar(): void {
    this.router.navigate(['/cadastro']);
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

}
