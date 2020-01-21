import { Avaliacoes } from './../../system-objects/avaliacoes-model';

export class PesquisaFuncionario {
    public nome: string = "";
    public sobrenome: string = "";
    public estado: string = "";
    public cidade: string = "";
    public id_avaliacao: Avaliacoes = new Avaliacoes();
    public experiencia: string = "";
    public idRole: number;
}