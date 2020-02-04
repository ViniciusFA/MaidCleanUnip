import { Cidade } from './../../system-objects/cidade-model';
import { Estado } from './../../system-objects/estado-model';
import { Usuario } from './../../system-objects/usuario-model';
export class Vaga {
    id: string;
    titulo: string;
    subtitulo: string;
    descricao: string;
    nomeEmpregador: string;
    estado: Estado = new Estado();
    cidade: Cidade = new Cidade();
    idUsuario:Usuario;
    idEmpregador:number;
}