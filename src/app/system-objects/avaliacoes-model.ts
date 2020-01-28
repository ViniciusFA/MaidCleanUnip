import { Stars } from './stars-model';
export class Avaliacoes{
    idAvaliacao:number;
    idUsuario:number;
    compromisso:number;
    organizacao:number;
    disciplina:number;
    limpeza:number;
    mediaAvaliacao:number;
    stars:Stars = new Stars();    

  }