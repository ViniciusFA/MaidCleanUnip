import { Experiencias } from 'src/app/system-objects/experiencias-model';
import { Cidade } from './../../system-objects/cidade-model';
import { Estado } from './../../system-objects/estado-model';
import { Usuario } from './../../system-objects/usuario-model';

export class Vaga {
    id: string = "";
    titulo: string = "";
    subtitulo: string = "";
    descricao: string = "";
    nomeEmpregador: string = "";
    estado: Estado = new Estado();
    cidade: Cidade = new Cidade();
    usuario:Usuario = new Usuario();
    idEmpregador:number =0;
    experiencia:Experiencias = new Experiencias();
}