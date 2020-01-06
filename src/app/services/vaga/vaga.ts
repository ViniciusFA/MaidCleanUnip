import { Usuario } from './../../system-objects/usuario-model';
export class Vaga {
    id: string;
    titulo: string;
    subtitulo: string;
    descricao: string;
    nomeEmpregador: string;
    estado: string;
    cidade: string;
    telefone: string;
    idUsuario:Usuario;
    idEmpregador:number;
}